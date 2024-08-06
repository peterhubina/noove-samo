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

// Read questions and extracted text from files
const questionsFilePath = path.join(__dirname, 'questions', 'question_specification.txt');
const textFilePath = path.join(__dirname, 'text_specification', 'extracted_text.txt');

const questions = readFileContent(questionsFilePath);
const extractedText = readFileContent(textFilePath);

const prompt = `${extractedText}\n\nBased on the above text, answer the following questions:\n${questions}`;

async function main() {
  try {
    const result = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant designed to analyze provided text and answer questions.",
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
    const outputDir = path.join(__dirname, 'text_specification', 'questions');
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
