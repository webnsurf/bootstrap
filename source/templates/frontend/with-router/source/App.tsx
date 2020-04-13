import React, { FC } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { MainPage, AboutPage } from 'pages/authorised';
import { Header } from 'components/layouts';

export const App: FC = () => (
  <div className="demos-app">
    <Header />

    <Switch>
      <Route path="/" exact component={ MainPage } />
      <Route path="/about" exact component={ AboutPage } />

      <Route render={ () => <Redirect to="/" /> } />
    </Switch>
  </div>
);
