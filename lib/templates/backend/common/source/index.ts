import express, { Router } from 'express';
import cookieParser from 'cookie-parser';

import { PORT } from './environment';
import { getDateString } from './utils';

const app = Router();

express().use('/api', app).listen(PORT, () => (
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${PORT} at ${getDateString()}`)
));

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello');
});
