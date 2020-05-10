import express, { Router } from 'express';
import cookieParser from 'cookie-parser';

import { PORT } from './environment';
import { usersRouter } from './routes';

const app = Router();

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

app.use('/users', usersRouter);
