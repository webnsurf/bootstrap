import { UserState, User, UserReducer } from './types';
import {
  BEFORE_AUTHENTICATE,
  AFTER_AUTHENTICATE,
  AFTER_LOGOUT,
  AFTER_AUTHENTICATE_ERROR,
} from './actions';

const initialUser: User = {
  userID: 0,
  name: '',
  email: '',
};

const initialUserState: UserState = {
  isAuthenticating: true,
  isLoggedIn: false,
  user: initialUser,
};

export const userReducer: UserReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case BEFORE_AUTHENTICATE: {
      return {
        ...state,
        isAuthenticating: true,
      };
    }
    case AFTER_AUTHENTICATE: {
      return {
        ...state,
        isAuthenticating: false,
        isLoggedIn: true,
        user: action.user,
      };
    }
    case AFTER_AUTHENTICATE_ERROR: {
      return {
        ...state,
        isAuthenticating: false,
        isLoggedIn: false,
      };
    }
    case AFTER_LOGOUT: {
      return {
        ...initialUserState,
        isAuthenticating: false,
      };
    }
    default: {
      return state;
    }
  }
};

export * from './actions';
export * from './selectors';
