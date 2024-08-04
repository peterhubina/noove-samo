import { getDocument, OPS } from 'pdfjs-dist';
import fs from 'fs';
import { encode } from 'fast-png';


if (!fs.existsSync('images'))
  fs.mkdirSync('images');

const data = new Uint8Array(fs.readFileSync('Project Specification.pdf'));
const document = await getDocument(data).promise;

for (let i = 1; i <= document.numPages; i++) {
  const page = await document.getPage(i);
  const operators = await page.getOperatorList();

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