import OpenAI from 'openai';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to encode an image to Base64
const encodeImage = (imagePath: string): string => {
  const imageBuffer = fs.readFileSync(imagePath);
  return imageBuffer.toString('base64');
};

const prompt = 'Analyze the images and output them as .json';

async function main() {
  try {
    const imagesDir = path.join(__dirname, 'images');
    const imageFiles = fs.readdirSync(imagesDir);

    const imageMessages = imageFiles.map((fileName: string) => {
      const filePath = path.join(imagesDir, fileName);
      const base64Image = encodeImage(filePath);
      return {
        type: "image_url",
        image_url: {
          url: `data:image/png;base64,${base64Image}`,
          detail: "high"
        }
      };
    });

    const messages: any = [
      {
        role: "system",
        content: "You are a helpful assistant designed to analyze data model images to output JSON.",
      },
      {
        role: 'user',
        content: [
          { type: "text", text: prompt },
          ...imageMessages
        ]
      }
    ];

    const result = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: messages,
      //max_tokens: 100,
    });

    const content = result.choices[0].message?.content;

    console.log(result);

    if (!content || !content.startsWith('{')) {
      throw new Error('Incomplete or invalid JSON received');
    }

    //console.log(result.choices[0]);

    let jsonObject: any;
    try {
      jsonObject = JSON.parse(content);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      return;
    }

    const now = new Date();
    const dateString = now.toISOString().replace(/:/g, '-');
    const outputPath = path.join(__dirname, 'output', `output-${dateString}.json`);

    if (!fs.existsSync(path.join(__dirname, 'output'))) {
      fs.mkdirSync(path.join(__dirname, 'output'));
    }

    fs.writeFileSync(outputPath, JSON.stringify(jsonObject, null, 2));
    console.log(`Output saved to ${outputPath}`);
  } catch (error) {
    console.error('Error generating or saving output:', error);
  }
}

main();