import express, { Router } from 'express';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

import {
  PORT,
  AUTH_TOKEN_KEY,
  JWT_SECRET,
  AUTH_COOKIE_OPTIONS,
} from './environment';

type User = {
  userID: number;
  email: string;
  name: string;
  password: string;
};

const users: User[] = [
  {
    userID: 1,
    email: 'test@webnsurf.com',
    name: 'Mr Test Testerson',
    password: 'test1234',
  },
];

const app = Router();
const findUserByEmail = (email: string): User => (
  users.find(user => user.email === email) || {} as User
);
const findUserByID = (id: number): Partial<User> => {
  const { userID, name, email } = users.find(user => user.userID === id) || {} as User;

  if (userID) {
    return { userID, name, email };
  }
};

const signUserToken = (userID: number) => jwt.sign({ userID }, JWT_SECRET, { expiresIn: '1d' });

express().use('/api', app).listen(PORT, () => (
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${PORT} at ${new Date().toString().replace(/ GMT.*$/, '')}`)
));

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello');
});


app.get('/users/authenticate', async (req, res) => {
  const authToken = String(req.cookies[AUTH_TOKEN_KEY]);

  if (authToken) {
    try {
      const decoded = jwt.verify(authToken, JWT_SECRET) as { userID: number } | null;
      const user = findUserByID(decoded && decoded.userID);

      if (user) {
        return res.cookie(
          AUTH_TOKEN_KEY,
          signUserToken(user.userID),
          AUTH_COOKIE_OPTIONS
        ).json(user);
      }
    } catch { }
  }

  res.status(403).send('Unauthorised');
});

app.post('/users/login', (req, res) => {
  const { email, password: providedPassword } = req.body;
  const { password, ...user } = findUserByEmail(email);

  if (user && providedPassword === password) {
    res.cookie(
      AUTH_TOKEN_KEY,
      signUserToken(user.userID),
      AUTH_COOKIE_OPTIONS
    ).json(user);
  }

  res.status(401).send('Invalid details. Please try again');
});
