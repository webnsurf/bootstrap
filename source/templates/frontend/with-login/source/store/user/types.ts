import { Action, Reducer } from 'redux';

import { ErrorModel } from 'api/utils';

import { AppActionTypes } from '../types';
import {
  BEFORE_AUTHENTICATE,
  AFTER_AUTHENTICATE,
  AFTER_LOGOUT,
  AFTER_AUTHENTICATE_ERROR,
} from './actions';

export interface UserResponse {
  userID: number;
  email: string;
  name: string;
}

export interface User {
  userID: number;
  email: string;
  name: string;
}

export interface UserActions {
  authenticate: () => Promise<ErrorModel | void>;
  register: (name: string, email: string, password: string) => Promise<ErrorModel | void>;
  login: (email: string, password: string) => Promise<ErrorModel | void>;
  logout: () => any;
}

export interface UserState {
  user: User;
  isLoggedIn: boolean;
  isAuthenticating: boolean;
}

export interface UserStore extends UserState {
  userActions: UserActions;
}

interface BeforeAuthenticateAction extends Action {
  type: typeof BEFORE_AUTHENTICATE;
}

interface AfterAuthenticateAction extends Action {
  type: typeof AFTER_AUTHENTICATE;
  user: User;
}

interface AfterAuthenticateErrorAction extends Action {
  type: typeof AFTER_AUTHENTICATE_ERROR;
}

interface AfterLogourAction extends Action {
  type: typeof AFTER_LOGOUT;
}

export interface BaseUserActions {
  beforeAuthenticate(): BeforeAuthenticateAction;
  afterAuthenticate(user: User): AfterAuthenticateAction;
  afterAuthenticateError(): AfterAuthenticateErrorAction;
  afterLogout(): AfterLogourAction;
}

export type UserReducer = Reducer<UserState, AppActionTypes>;

export type UserActionTypes = BeforeAuthenticateAction
  | AfterAuthenticateAction
  | AfterAuthenticateErrorAction
  | AfterLogourAction;
