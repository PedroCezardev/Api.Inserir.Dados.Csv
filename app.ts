import express from 'express';
import fileUpload from 'express-fileupload';

import { Router, Request, Response } from 'express';

import { upload } from './src/controller';

const app = express();

const route = Router();

app.use(express.json());


app.use(fileUpload({
  useTempFiles : true,
}));

route.get('/', (req: Request, res: Response) => {
  res.json({ message: 'hello world with Typescript' });
});

route.post('/upload', upload);

app.use(route);

app.listen(3333, () => 'server running on port 3333');
