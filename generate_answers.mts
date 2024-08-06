import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const questionsFilePath = path.join(__dirname, 'text_specification', 'questions', 'question_specification.txt');
const textFilePath = path.join(__dirname, 'text_specification', 'extracted_text.txt');

const questions = fs.readFileSync(questionsFilePath, 'utf-8');
const extractedText = fs.readFileSync(textFilePath, 'utf-8');

const prompt = `${extractedText}\n\nBased on the above text, answer the following questions:\n${questions}`;

(async () => {
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 1000,
    });

    const answers = response.data.choices[0].text.trim();
    fs.writeFileSync(path.join(__dirname, 'text_specification', 'questions', 'answers.txt'), answers);
    console.log('Answers generated and saved to answers.txt');
  } catch (error) {
    console.error('Error generating answers:', error);
  }
})();
