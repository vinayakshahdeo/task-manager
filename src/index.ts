import express, { Express, Request, Response } from 'express';
import 'reflect-metadata';
import { container } from './config/container';
import { TasksController } from './tasks/tasks.controller';

const app: Express = express();
const PORT = 3000;

app.get('/', (_req, res: Response) => {
  res.send('Express + TypeScript Server');
});

const task = container.get<TasksController>(TasksController);

app.post('/tasks', (_req: Request, res: Response) => {
  const newTask = task.createTask();
  res.json(newTask);
});

app.listen(PORT, '0.0.0.0', () => {
  console.warn(`Server running on port ${PORT}`);
});
