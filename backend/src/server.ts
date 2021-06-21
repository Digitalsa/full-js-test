import './database';
import 'reflect-metadata';

import { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import express from 'express';
import routes from './routes';
import AppError from './errors/AppError';
import './container';

const app = express();


app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
});

app.listen(3333, () => {
  console.log("🚀 Server started on port 3333!");
});

