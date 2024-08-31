import { Request, Response } from "express";
import path from "path";

export const download = (req: Request, res: Response) => {
    const filePath = path.join(__dirname, '..', '..', 'configuration.zip');

    // Set headers
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="configuration.zip"');

    // Send the file
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error sending the file:', err);
            res.status(500).send('Error downloading the file');
        }
    });
};