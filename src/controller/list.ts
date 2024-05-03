import { Request, Response } from 'express';
import { promises as fsPromises } from 'fs';
import path from 'path';

async function list(req: Request, res: Response): Promise<void> {
  const directoryPath = path.join(__dirname, '../../data');
  try {
    const files = await fsPromises.readdir(directoryPath);
    const csvFiles = files.filter(file => path.extname(file).toLowerCase() === '.csv');
    res.json(csvFiles);
  } catch (err) {
    console.log('Unable to scan directory: ' + err);
    res.status(500).json({ error: 'Unable to scan directory' });
  }
}

export { list }