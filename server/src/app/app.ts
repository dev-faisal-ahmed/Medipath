import express from 'express';
import cors from 'cors';

import { errorHandler } from '../middlewares';
import { appRouter } from './router';

export const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1', appRouter);

app.all('/', (_, res) => {
  res.status(200).json({ ok: true, message: 'Welcome to Medipath Server' });
});

app.all('*', (_, res) => {
  res.status(400).json({ ok: false, message: 'Route not found' });
});

app.use(errorHandler);
