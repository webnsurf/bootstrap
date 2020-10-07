import { Router } from 'express';
import jwt from 'jsonwebtoken';
import validator from 'validator';

import {
  AUTH_TOKEN_KEY,
  JWT_SECRET,
  AUTH_COOKIE_OPTIONS,
} from '../environment';
import {
  findUserByID,
  signUserToken,
  findUserByEmail,
} from '../utils';

export const usersRouter = Router();

usersRouter.get('/authenticate', async (req, res) => {
  const authToken = String(req.cookies[AUTH_TOKEN_KEY]);

  if (authToken) {
    try {
      const decoded = jwt.verify(authToken, JWT_SECRET) as { userID: number } | null;

      if (decoded) {
        const user = findUserByID(decoded.userID);

        if (user) {
          const { password, ...rest } = user;

          return res.cookie(
            AUTH_TOKEN_KEY,
            signUserToken(user.userID),
            AUTH_COOKIE_OPTIONS,
          ).json(rest);
        }
      }
    } catch { }
  }

  res.status(403).send('Unauthorised');
});

usersRouter.post('/login', (req, res) => {
  const { email, password: providedPassword } = req.body;

  if (validator.isEmail(email)) {
    const user = findUserByEmail(email);

    if (user) {
      const { password, ...rest } = user;

      if (providedPassword === password) {
        return res.cookie(
          AUTH_TOKEN_KEY,
          signUserToken(user.userID),
          AUTH_COOKIE_OPTIONS,
        ).json(rest);
      }
    }
  }

  res.status(401).send('Invalid details. Please try again');
});
