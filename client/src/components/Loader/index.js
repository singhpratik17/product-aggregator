import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

const Loader = () => {
  return (
    <Grid
      container
      style={{ display: 'flex', height: `calc(100vh - 122px)`, marginTop: '122px' }}
      alignItems={'center'}
      justify={'center'}>
      <CircularProgress color="primary" size={40} />
    </Grid>
  );
};

export default Loader;
