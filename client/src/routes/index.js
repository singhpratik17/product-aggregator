import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Paths } from './routePaths';

/**
 * Import Containers here
 */
import Temp from '../containers/Temp';

const Routes = () => (
  <Switch>
    <Route path={Paths.Temp} component={Temp} />
  </Switch>
);

export default Routes;
