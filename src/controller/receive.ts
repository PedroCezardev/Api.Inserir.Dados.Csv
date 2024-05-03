import { Request, Response } from 'express';
import { promises as fsPromises } from 'fs';
import fileUpload from 'express-fileupload';
import path from 'path';

async function receive(req: Request, res: Response): Promise<void> {
    const csvFile = req.files?.csv;
    if (!csvFile) throw new Error('file not found');
    const csv = csvFile as fileUpload.UploadedFile;
    console.log(csv);   

    const filePath = path.join(__dirname, '../../data', '', csv.name);

    await fsPromises.writeFile(filePath, await fsPromises.readFile(csv.tempFilePath, 'utf8'));

    res.json({ message: '/uplaod funcionando!' });
}

export { receive }
