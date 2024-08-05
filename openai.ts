import OpenAI from 'openai';
import 'dotenv/config';

const fs = require('fs');
const path = require('path');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to encode an image to Base64
const encodeImage = (imagePath: string): string => {
  const imageBuffer = fs.readFileSync(imagePath);
  return imageBuffer.toString('base64');
};

async function main() {
  try {
    const result = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ 
        role: 'user', 
        content: [
          { "type": "text", "text": "Describe the image" },
          {
            "type": "image_url",
            "image_url": {
                "url": `data:image/jpeg;base64,${encodeImage(path.join(__dirname, 'images', 'img_p2_1.png'))}`
              }
          },
          {
            "type": "image_url",
            "image_url": {
                "url": `data:image/jpeg;base64,${encodeImage(path.join(__dirname, 'images', 'img_p3_1.png'))}`
              }
          },
          {
            "type": "image_url",
            "image_url": {
                "url": `data:image/jpeg;base64,${encodeImage(path.join(__dirname, 'images', 'img_p4_1.png'))}`
              }
          },
          {
            "type": "image_url",
            "image_url": {
                "url": `data:image/jpeg;base64,${encodeImage(path.join(__dirname, 'images', 'img_p5_1.png'))}`
              }
          },
          {
            "type": "image_url",
            "image_url": {
                "url": `data:image/jpeg;base64,${encodeImage(path.join(__dirname, 'images', 'img_p6_1.png'))}`
              }
          },
        ]
      }],
      max_tokens: 600,
    });
    
    const content = result.choices[0].message.content;
    console.log(content);

    const now = new Date();
    const dateString = now.toISOString().replace(/:/g, '-');
    const outputPath = path.join(__dirname, 'output', `output-${dateString}.md`);

    if (!fs.existsSync(path.join(__dirname, 'output'))) {
      fs.mkdirSync(path.join(__dirname, 'output'));
    }

    // Save the output to a .md file
    fs.writeFileSync(outputPath, content);
    console.log(`Output saved to ${outputPath}`);
  } catch (error) {
    console.error('Error generating or saving output:', error);
  }
} 

main();