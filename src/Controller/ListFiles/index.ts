import { Request, Response } from 'express';
import { promises as fsPromises } from 'fs';

import fileUpload from 'express-fileupload';
import path from 'path';

export default async function (req: Request, res: Response): Promise<void> {
    const filePath = path.join(__dirname, '../../../','data/');
    
    const files = (await fsPromises.readdir(filePath)).filter(files => files.includes('.csv'));

    res.json({ files });
}
