import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Cookies from 'cookies-js';

import { userAPI } from 'api/user';
import { resolveError } from 'api/utils';
import { AUTH_TOKEN_KEY, LAST_URL_KEY } from 'environment';

import { UserActions, BaseUserActions } from './types';


export const BEFORE_AUTHENTICATE = 'BEFORE_AUTHENTICATE';
export const AFTER_AUTHENTICATE = 'AFTER_AUTHENTICATE';
export const AFTER_AUTHENTICATE_ERROR = 'AFTER_AUTHENTICATE_ERROR';
export const AFTER_LOGOUT = 'AFTER_LOGOUT';

export const baseActions: BaseUserActions = {
  beforeAuthenticate: () => ({
    type: BEFORE_AUTHENTICATE,
  }),
  afterAuthenticate: user => ({
    type: AFTER_AUTHENTICATE,
    user,
  }),
  afterAuthenticateError: () => ({
    type: AFTER_AUTHENTICATE_ERROR,
  }),
  afterLogout: () => ({
    type: AFTER_LOGOUT,
  }),
};

export const useUserActions = (): UserActions => {
  const dispatch = useDispatch();
  const history = useHistory();

  const actions = useMemo((): UserActions => ({
    authenticate: async () => {
      if (Cookies.get(AUTH_TOKEN_KEY)) {
        dispatch(baseActions.beforeAuthenticate());

        try {
          const user = await userAPI.authenticate();

          dispatch(baseActions.afterAuthenticate(user));
          return;
        } catch (error) {
          dispatch(baseActions.afterAuthenticateError());
          return resolveError(error);
        }
      }

      actions.logout();
    },

    register: async (name, email, password) => {
      try {
        const user = await userAPI.register(name, email, password);

        dispatch(baseActions.afterAuthenticate(user));
      } catch (error) {
        dispatch(baseActions.afterAuthenticateError());
        return resolveError(error);
      }
    },

    login: async (email, password) => {
      try {
        const user = await userAPI.login(email, password);

        dispatch(baseActions.afterAuthenticate(user));

        history.push(Cookies.get(LAST_URL_KEY) || '/');

        Cookies.expire(LAST_URL_KEY);
      } catch (error) {
        dispatch(baseActions.afterAuthenticateError());
        return resolveError(error);
      }
    },

    logout: async () => {
      const { pathname } = window.location;

      Cookies.expire(AUTH_TOKEN_KEY);

      dispatch(baseActions.afterLogout());

      if (!['/login'].includes(pathname)) {
        Cookies.set(LAST_URL_KEY, pathname);

        history.push('/login');
      }
    },
  }), [dispatch, history]);

  return actions;
};
