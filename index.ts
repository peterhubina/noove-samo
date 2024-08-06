import { getDocument, OPS } from 'pdfjs-dist';
import fs from 'fs';
import { encode } from 'fast-png';

if (!fs.existsSync('images')) {
  fs.mkdirSync('images');
}

const data = new Uint8Array(fs.readFileSync('Project Specification.pdf'));
const document = await getDocument(data).promise;

const pageTexts: string[] = [];

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
        channels: 3,
      });

      fs.writeFileSync(`images/${imageName}.png`, png);
    }
  }
}

console.log('Extracted text from PDF:', pageTexts.join('\n'));
fs.writeFileSync('text_specification/extracted_text.txt', pageTexts.join('\n'));
