import 'reflect-metadata';
import express, { Express, Request, Response } from 'express';
import { addRoutes } from './config/routes.config';

const app: Express = express();
const PORT = 3000;

app.get('/', (_req: Request, res: Response) => {
  res.send('Express + TypeScript Server for nodejs default routes');
});

addRoutes(app);

app.listen(PORT, '0.0.0.0', () => {
  console.warn(`Server running on port ${PORT}`);
});
