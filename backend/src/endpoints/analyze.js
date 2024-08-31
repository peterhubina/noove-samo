import express, { Request, Response } from 'express';

const multer = require('multer');
const processFile = require('../../processFile.js');
const path = require('path');

const analyzeRouter = express.Router();

const upload = multer({ dest: 'uploads/' });

analyzeRouter.post('/analyze', upload.single('file'), async (req, res) => {
    try {
        const filePath = req.file.path;
        console.log("File Path: ", filePath);

        if (!filePath) {
            return res.status(400).json({ error: 'File upload failed' });
        }

        // Process the PDF file
        await processFile(filePath);

        res.json({ message: 'File processed successfully' });
    } catch (error) {
        console.error('Error processing file:', error);
        res.status(500).json({ error: 'Failed to process file' });
    }
});

export default analyzeRouter;