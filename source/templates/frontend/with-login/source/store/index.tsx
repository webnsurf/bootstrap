import { createStore, combineReducers } from 'redux';

import { isProduction } from 'environment';

import { userReducer } from './user';
import { AppState, AppActionTypes } from './types';

const win = window as any;
// eslint-disable-next-line no-underscore-dangle
const reduxDevtoolsExtension = win.__REDUX_DEVTOOLS_EXTENSION__;

const rootReducer = combineReducers<AppState, AppActionTypes>({
  user: userReducer,
});

export const store = createStore(
  rootReducer,
  {},
  !isProduction && reduxDevtoolsExtension
    ? reduxDevtoolsExtension()
    : undefined,
);
