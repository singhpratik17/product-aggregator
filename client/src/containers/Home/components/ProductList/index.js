import React from 'react';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import List from '@material-ui/core/List';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  productImage: {
    height: 80,
    maxWidth: 120,
    width: 'auto',
    marginRight: 8
  },
  productContainer: {
    padding: theme.spacing(1, 0),
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
    '@media (min-width: 900px)': {
      height: '156px'
    }
  }
}));

const ProductList = ({ data }) => {
  const classes = useStyles();
  return (
    <List>
      {data.map(item =>
        item.name && item.price ? (
          <React.Fragment key={item.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <img
                  alt={item.name}
                  className={classes.productImage}
                  src={
                    item.imgUrl ||
                    `https://via.placeholder.com/120x80?text=Not found`
                  }
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  item.name?.length > 90
                    ? `${item.name.slice(0, 90)}...`
                    : item.name
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      style={{ marginRight: 8 }}
                      color="textPrimary">
                      {item.price}
                    </Typography>
                    <s>{item.originalPrice}</s>
                  </React.Fragment>
                }
              />
              <Button
                href={item.productUrl}
                variant="contained"
                color={'primary'}
                size={'small'}
                disableElevation
                target={'_blank'}>
                Buy
              </Button>
            </ListItem>
            <Divider />
          </React.Fragment>
        ) : null
      )}
    </List>
  );
};

export default ProductList;
