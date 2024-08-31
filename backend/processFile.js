const fs = require('fs');
const { encode } = require('fast-png');
import * as pdfjs from 'pdfjs-dist';
//pdfjs.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.js');

import { main } from './analyzeDiagrams';

const processFile = async (filePath) => {
    fs.rmSync('images', { recursive: true, force: true });
    fs.mkdirSync('images');

    console.log("Analyzing....");

    const data = new Uint8Array(fs.readFileSync(filePath));
    const { getDocument, OPS } = pdfjs;

    const document = await getDocument(data).promise;

    const pageTexts = [];

    for (let i = 1; i <= document.numPages; i++) {
        const page = await document.getPage(i);
        const operators = await page.getOperatorList();

        const textContent = await page.getTextContent();
        const text = textContent.items.filter(item => 'str' in item)
            .map((item) => item.str + (item.hasEOL ? '\n' : '')).join('');

        pageTexts.push(text);

        for (let j = 0; j < operators.fnArray.length; j++) {
            const operator = operators.fnArray[j];
            const args = operators.argsArray[j];

            if (operator === OPS.paintImageXObject) {
                const imageName = args[0];
                const image = page.objs.get(imageName);

                const png = encode({
                    width: image.width,
                    height: image.height,
                    data: image.data,
                    channels: image.data.length / (image.width * image.height),
                });

                fs.writeFileSync(`images/${imageName}.png`, png);
            }
        }
    }

    fs.writeFileSync(`text.txt`, pageTexts.join('\n\n\n'));

    // analyzeDiagrams.ts
    await main();
}

module.exports = processFile;