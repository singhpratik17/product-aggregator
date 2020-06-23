import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import AppBar from '@material-ui/core/AppBar/AppBar';

const Header = ({handleSearchSubmit, handleSearchChange}) => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h1">Product Aggregator</Typography>
        <TextField
          placeholder="Search"
          id="search-products"
          variant="outlined"
          onChange={evt => handleSearchChange(evt.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => handleSearchSubmit()}
                  edge="end">
                  <SearchIcon color={'primary'} />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Toolbar>
    </AppBar>
  )
};

export default Header;
