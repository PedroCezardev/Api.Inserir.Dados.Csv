import { Request, Response } from 'express';
import { promises as fsPromises } from 'fs';

import path from 'path';

interface CsvData {
    [key: string]: string[];
}

function proccessData(content: string) {
    try {
        const contentLines = content.split(/\r?\n/);

        if (contentLines.length === 0) {
            throw new Error('CSV file is empty');
        }

        // [ '', 'Tokyo', 'Kyoto', 'Osaka' ]
        const headers = contentLines[0].split(',').map(header => header.trim());

        const data: CsvData = {};

        for (let i = 1; i < contentLines.length; i++) {
            const line = contentLines[i];
            if (line.trim() === '') continue;

            const values = line.split(',').map(value => value.trim());
            const label = values[0];

            data[label] = [];

            for (let j = 1; j < headers.length; j++) {
                data[label].push(values[j]);
            }
        }

        return  { labels: headers.filter(header => header), data };
    } catch (err) {
        console.error('Error processing CSV file:', err);
        throw err;
    }
}

export default async function (req: Request, res: Response): Promise<void> {
    const fileName = req.query.name as string;

    if (!fileName)
        res.status(400).json({ message: 'file not found in request' });

    const filePath = path.join(__dirname, '../../../','data/', fileName);

    if (!fsPromises.access(filePath)) {
        res.status(400).json({ message: 'file not found' });
        return;
    }

    const content = await fsPromises.readFile(filePath, { encoding: 'utf-8' });
    const data = proccessData(content);

    res.json({ ...data });
}
