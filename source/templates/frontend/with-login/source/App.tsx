import React, { FC, useEffect } from 'react';
import { Route } from 'react-router-dom';

import {
  useIsAuthenticating,
  useIsLoggedIn,
  useUserActions,
} from 'store/user';

import { Authorised } from 'routes/Authorised';
import { Unauthorised } from 'routes/Unauthorised';
import { Spinner } from 'components/common';

export const App: FC = () => {
  const isLoggedIn = useIsLoggedIn();
  const userActions = useUserActions();
  const isAuthenticating = useIsAuthenticating();

  useEffect(() => {
    userActions.authenticate();
  }, [userActions]);

  if (isAuthenticating) {
    return <Spinner type="dark" />;
  }

  return (
    <div className="demos-app">
      <Route path="/" component={ isLoggedIn ? Authorised : Unauthorised } />
    </div>
  );
};
