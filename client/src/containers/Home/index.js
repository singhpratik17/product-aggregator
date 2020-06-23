import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import { useMutation } from '@apollo/react-hooks';
import { SEARCH_PRODUCTS } from './mutations';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const Home = () => {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h1">
            Product Aggregator
          </Typography>
          <TextField
            placeholder="Search"
            id="search-products"
            variant="outlined"
            InputProps={{
              endAdornment: <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => null}
                  edge="end"
                >
                  <SearchIcon color={"primary"} />
                </IconButton>
              </InputAdornment>,
            }}
          />
        </Toolbar>
      </AppBar>

      <Grid container>
        <Grid xs>

        </Grid>
        <Grid xs>

        </Grid>
      </Grid>
    </>
  );
};

export default Home;
