import React, { FC } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { LoginPage } from 'pages/unauthorised';

export const Unauthorised: FC = () => (
  <Switch>
    <Route path="/login" component={ LoginPage } />

    <Route render={ () => <Redirect to="/login" /> } />
  </Switch>
);
