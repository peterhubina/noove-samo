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

//const dataTypes = 'Code_T, Description_T, CodeList_T, Currency_T, DateOnly_T'

/*const prompt = `Describe feature types and attributes of individual images.
                Name and types of attributes are 
                separated by : and we only need the name of the attribute.
                It's important to describe every single attribute of the data model. 
                The data types are named in this format: datatype_T. Also describe relations between individual entities.`;*/

const prompt = 'Analyse the image and output it as .json' 

async function main() {
  try {
    const result = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant designed to analyze data model image to output JSON.",
        },
        { 
        role: 'user', 
        content: [
          { "type": "text", "text": prompt },
          {
            "type": "image_url",
            "image_url": {
                "url": `data:image/png;base64,${encodeImage(path.join(__dirname, 'images', 'img_p3_1_resized.png'))}`,
                "detail": "high"
              }
          },
        ]
      }],
      response_format: { "type": "json_object" },
      max_tokens: 2000,
    });
    
    const content = result.choices[0].message.content;
    console.log(result.choices[0])

    const jsonObject = JSON.parse(content || '');

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