import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import Header from '../../components/Header';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { SEARCH_PRODUCTS } from './mutations';
import ProductList from './components/ProductList';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { FETCH_PRODUCT_DETAILS } from './queries';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(18, 0, 0, 0),
    padding: theme.spacing(2)
  },
  modalStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paperStyles: {
    padding: theme.spacing(1),
    border: 'none'
  }
}));

const Home = () => {
  const classes = useStyles();

  const [searchText, setSearchText] = useState('');
  const [fetchedText, setFetchedText] = useState('');
  const [modalState, setModalState] = useState(false);

  const [search, { data, loading, error }] = useMutation(SEARCH_PRODUCTS, {
    onError: () => {
      return;
    },
    onCompleted: () => {
      setFetchedText(searchText);
    }
  });

  const [
    fetchProductDetails,
    { data: productDetails, loading: detailsLoading, error: detailsError }
  ] = useLazyQuery(FETCH_PRODUCT_DETAILS, {
    onError: () => {
      return;
    },
    onCompleted: () => {}
  });

  const handleSearchSubmit = async () => {
    if (searchText.length && fetchedText !== searchText) {
      await search({
        variables: { searchText }
      });
    } else if (!searchText.length) {
      Message.error('Please enter search query.');
    }
  };

  const handleBuyClick = async url => {
    await fetchProductDetails({
      variables: {
        url
      }
    });
    setModalState(true);
  };

  return (
    <>
      <Header
        handleSearchChange={val => setSearchText(val)}
        handleSearchSubmit={handleSearchSubmit}
      />
      {!loading ? (
        !error && data ? (
          <Grid
            container
            item
            className={classes.container}
            alignItems={'flex-start'}
            spacing={2}>
            <Grid container item xs={12} md={6} direction={'column'}>
              <Grid>
                <Typography variant={'h2'}>Amazon</Typography>
              </Grid>
              <ProductList
                handleBuyClick={handleBuyClick}
                data={data.searchProducts?.amazonResults || []}
              />
            </Grid>
            <Grid container item xs={12} md={6} direction={'column'}>
              <Grid>
                <Typography variant={'h2'}>Flipkart</Typography>
              </Grid>
              <ProductList
                data={data.searchProducts?.flipkartResults || []}
                handleBuyClick={handleBuyClick}
              />
            </Grid>
          </Grid>
        ) : null
      ) : (
        <Loader />
      )}

      <Modal
        className={classes.modalStyle}
        open={modalState && productDetails?.fetchProductDetails?.features}
        onClose={() => setModalState(false)}
        aria-labelledby="product-details"
        aria-describedby="product-details">
        <Paper className={classes.paperStyles}>
          <List>
            {productDetails?.fetchProductDetails.features.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Modal>
    </>
  );
};

export default Home;
