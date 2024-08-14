import { getDocument, OPS } from 'pdfjs-dist';
// @ts-ignore
import fs from 'fs';


const data = new Uint8Array(fs.readFileSync(pdfPath));
const document = await getDocument(data).promise;

const pageTexts: string[] = [];

for (let i = 1; i <= document.numPages; i++) {
    const page = await document.getPage(i);

    const textContent = await page.getTextContent();
    const text = textContent.items.filter(item => 'str' in item)
        .map((item) => item.str + (item.hasEOL ? '\n' : '')).join('');

    pageTexts.push(text);
}

fs.writeFileSync(outputPath, pageTexts.join('\n\n\n'));