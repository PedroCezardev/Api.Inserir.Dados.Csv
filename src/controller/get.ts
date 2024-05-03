import { Request, Response } from 'express';
import { promises as fsPromises } from 'fs';
import path from 'path';

async function get(req: Request, res: Response): Promise<void> {
  const { filename } = req.query as { filename: string };
  console.log(filename);
  const filePath = path.join(__dirname, '../../data', filename);
  console.log(filePath);

  try {
    if (path.extname(filename).toLowerCase() !== '.csv') {
      res.status(400).json({ error: 'Invalid file type. Only .csv files are allowed.' });
      return;
    }
    const data = await fsPromises.readFile(filePath, 'utf8');
    console.log(data);
    res.send(data);
  } catch (err: Error | RangeError | TypeError | URIError | EvalError | SyntaxError | ReferenceError | any) {
    if (err?.code === 'ENOENT') {
      res.status(404).json({ error: 'File not found. ' + err });
    } else {
      res.status(500).json({ error: 'Server error' });
    }
  }
}

export { get }