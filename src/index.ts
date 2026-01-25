import express, { type Express, type Response } from 'express';

const app: Express = express();
const port = 3001;

app.get('/', (_req, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.warn(`[server]: Server is running at http://localhost:${port}`);
});
