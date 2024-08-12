/*import * as fs from 'fs';
import * as path from 'path';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';

async function pdfToText(pdfPath: string, outputTxtPath: string): Promise<void> {

    const data = new Uint8Array(fs.readFileSync(pdfPath));
    const pdfDoc = await pdfjsLib.getDocument({ data }).promise;

    const textArray: string[] = [];
    for (let i = 1; i <= pdfDoc.numPages; i++) {
        const page = await pdfDoc.getPage(i);
        const content = await page.getTextContent();
        const strings = content.items.map((item: any) => item.str);
        textArray.push(`Page ${i}:\n${strings.join(' ')}\n`);
    }

    const fullText = textArray.join('\n');

    fs.writeFileSync(outputTxtPath, fullText, { encoding: 'utf-8' });

    console.log(`Text extracted and saved to ${outputTxtPath}`);
}

(async () => {
    const pdfPath = path.join(__dirname, 'path/to/your/pdf-file.pdf');
    const outputTxtPath = path.join(__dirname, 'path/to/save/output-file.txt');

    await pdfToText(pdfPath, outputTxtPath);
})();*/