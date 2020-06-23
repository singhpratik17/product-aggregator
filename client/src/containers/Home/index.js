import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import Header from '../../components/Header';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useMutation } from '@apollo/react-hooks';
import { SEARCH_PRODUCTS } from './mutations';
import ProductList from './components/ProductList';
import Loader from '../../components/Loader';

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(18, 0, 0, 0),
    padding: theme.spacing(2)
  }
}));

const Home = () => {
  const classes = useStyles();

  const [searchText, setSearchText] = useState('');

  const [search, { data, loading, error }] = useMutation(SEARCH_PRODUCTS);

  const handleSearchSubmit = async () => {
    await search({
      variables: { searchText },
      onError: () => {
        return;
      }
    });
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
              <ProductList data={data.searchProducts?.amazonResults || []} />
            </Grid>
            <Grid container item xs={12} md={6} direction={'column'}>
              <Grid>
                <Typography variant={'h2'}>Flipkart</Typography>
              </Grid>
              <ProductList data={data.searchProducts?.flipkartResults || []} />
            </Grid>
          </Grid>
        ) : null
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Home;
