import express, { type Express, type Response } from 'express';

const app: Express = express();
const PORT = 3000;

app.get('/', (_req, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(PORT, '0.0.0.0', () => {
  console.warn(`Server running on port ${PORT}`);
});
