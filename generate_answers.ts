import OpenAI from 'openai';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to read a file's content
const readFileContent = (filePath: string): string => {
  return fs.readFileSync(filePath, 'utf-8');
};

// Function to encode an image to Base64
const encodeImage = (imagePath: string): string => {
  const imageBuffer = fs.readFileSync(imagePath);
  return imageBuffer.toString('base64');
};

// Function to analyze an image and return JSON
const analyzeImage = async (imagePath: string): Promise<any> => {
  const prompt = 'Analyse the image and output it as .json';

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
                  "url": `data:image/png;base64,${encodeImage(imagePath)}`,
                  "detail": "high"
                }
            },
          ]
        }
      ],
      response_format: { "type": "json_object" },
      max_tokens: 2000,
    });

    const content = result.choices[0].message.content;
    const jsonObject = JSON.parse(content || '');

    return jsonObject;
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
};

// Read questions and extracted text from files
const questionsFilePath = path.join(__dirname, 'questions', 'question_specification.txt');
const textFilePath = path.join(__dirname, 'text_specification', 'extracted_text.txt');

const questions = readFileContent(questionsFilePath);
const extractedText = readFileContent(textFilePath);

const imageFilePath = path.join(__dirname, 'images', 'img_p3_1_resized.png');

async function main() {
  try {
    // Analyze the image
    const imageAnalysis = await analyzeImage(imageFilePath);

    // Combine extracted text and image analysis into a single prompt
    const combinedData = {
      extractedText,
      imageAnalysis
    };

    const prompt = `${JSON.stringify(combinedData)}\n\nBased on the above data, answer the following questions in format question:Ano/Nie. Be careful, dont fabricate, it must be correct. it s really important.\n${questions}`;

    const result = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant designed to analyze provided data and answer questions.",
        },
        { 
          role: 'user', 
          content: prompt 
        }
      ],
      max_tokens: 1000,
    });

    const answers = result.choices[0]?.message?.content?.trim() || '';

    // Ensure the output directory exists
    const outputDir = path.join(__dirname, 'text_specification');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, 'answers.txt');
    fs.writeFileSync(outputPath, answers);
    console.log('Answers generated and saved to answers.txt');
  } catch (error) {
    console.error('Error generating answers:', error);
  }
}

main();
