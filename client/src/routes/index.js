import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Paths } from './routePaths';

/**
 * Import Containers here
 */
import Home from '../containers/Home';


const Routes = () => (
  <Switch>
    <Route path={Paths.Home} component={Home} />
  </Switch>
);

export default Routes;
