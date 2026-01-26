import 'reflect-metadata';
import express, { Express, Request, Response } from 'express';
import { tasksRouter } from './tasks/tasks.router';

const app: Express = express();
const PORT = 3000;

app.get('/', (_req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use('/tasks', tasksRouter);

app.listen(PORT, '0.0.0.0', () => {
  console.warn(`Server running on port ${PORT}`);
});
