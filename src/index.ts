import 'reflect-metadata';
import express, { Express, Request, Response } from 'express';
import { addRoutes } from './config/routes.config';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

const app: Express = express();

dotenv.config();

//adding middleware from express
app.use(express.json());

const PORT: number = (process.env.PORT || 3001) as unknown as number;

app.get('/', (_req: Request, res: Response) => {
  res.send('Express + TypeScript Server for nodejs default routes');
});

addRoutes(app);

async function bootstrap() {
  const dbString = process.env.DATABASE_CONNECTION_STRING;
  try {
    if (!dbString) {
      throw new Error('Cannot read environment variables');
    }
    await mongoose.connect(dbString, { dbName: process.env.DATABASE_NAME });
    console.warn('Connected to Mongodb');
    app.listen(PORT, '0.0.0.0', () => {
      console.warn(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

bootstrap();
