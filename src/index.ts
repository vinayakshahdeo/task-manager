import express, { type Express, type Response } from 'express';
import 'reflect-metadata';
import { Page } from './page';

import { container } from './config/container';

const app: Express = express();
const PORT = 3000;

app.get('/', (_req, res: Response) => {
  res.send('Express + TypeScript Server');
});

// const pageClass = container.get(Page);
const pageClass = container.get<Page>(Page);

app.post('/create-page', (_req, res: Response) => {
  const page = pageClass.createPage('http://page.com');
  res.json(page);
});

app.listen(PORT, '0.0.0.0', () => {
  console.warn(`Server running on port ${PORT}`);
});
