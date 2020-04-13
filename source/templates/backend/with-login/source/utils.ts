import jwt from 'jsonwebtoken';

import { JWT_SECRET, AUTH_COOKIE_OPTIONS } from './environment';
import { users } from './database';
import { User } from './types';

export const pause = (ms: number) => (
  new Promise(resolve => setTimeout(resolve, ms))
);

export const getDateString = () => (
  new Date().toString().replace(/ GMT.*$/, '')
);

export const findUserByEmail = (providedEmail: string): User | null => {
  const user = users.find(({ email }) => email === providedEmail);

  return user ? { ...user } : null;
};

export const findUserByID = (providedId: number): User | null => {
  const user = users.find(({ userID }) => userID === providedId);

  return user ? { ...user } : null;
};

export const signUserToken = (userID: number) => (
  jwt.sign({ userID }, JWT_SECRET, {
    expiresIn: AUTH_COOKIE_OPTIONS.maxAge / 1000,
  })
);
