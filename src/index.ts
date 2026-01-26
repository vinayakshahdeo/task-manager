import express, { type Express, type Response } from 'express';
import { Page } from './page';
import { Post } from './post';
import { User } from './user';

const app: Express = express();
const PORT = 3000;

app.get('/', (_req, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.post('/create-post', (_req, res: Response) => {
  const post = new Post('Post Title', 'Post Content', new User('User Name'));
  // res.json(post); // or you can use send instad of json
  res.send({ text: 'Post is Created', post });
});

app.post('/create-page', (_req, res: Response) => {
  const page = new Page('http://page.com', new User('User Name'));
  // res.json(post); // or you can use send instad of json
  res.send({ text: 'Page is Created', page });
});

app.listen(PORT, '0.0.0.0', () => {
  console.warn(`Server running on port ${PORT}`);
});
