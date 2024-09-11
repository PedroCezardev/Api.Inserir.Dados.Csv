import { Request, Response } from 'express';
import { promises as fsPromises } from 'fs';

import fileUpload from 'express-fileupload';
import path from 'path';

export default async function (req: Request, res: Response): Promise<void> {
    const csvFile = req.files?.csv;

    if (!csvFile) {
        res.status(400).json({ message: 'file csv not found' });
    }

    const csv = csvFile as fileUpload.UploadedFile;
    console.log(csv);

    const filePath = path.join(__dirname, '../../../','data/', csv.name);
    const data = csv.data;

    const tmpContent = await fsPromises.readFile(csv.tempFilePath, { encoding: 'utf-8' });

    await fsPromises.writeFile(filePath, tmpContent.toString(), { encoding: 'utf-8', flag: 'a' });

    res.json({ message: '/uplaod funcionando!' });
}
