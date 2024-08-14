import OpenAI from 'openai';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';

const nunjucks = require('nunjucks');

import {zodResponseFormat} from "openai/helpers/zod";
import {modelSchema} from "./generate/model/modelSchema";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const projectSpecification = fs.readFileSync('text.txt', 'utf-8');
const namingConventions = fs.readFileSync('data/conventions.txt', 'utf-8');

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
        content: `You are a helpful assistant designed to analyze ER diagram images to output them as JSON.
                  Also analyze Project Specification to produce a JSON schema for the project.
                  Project specification: ${projectSpecification}
                  You should preserve naming conventions that are described here: ${namingConventions}`,
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
      model: 'gpt-4o-2024-08-06',
      messages: messages,
      response_format: zodResponseFormat(modelSchema, 'schema'),
    });

    const content : string = result.choices[0].message?.content || '';
    let jsonObject = JSON.parse(content);

    const template = fs.readFileSync('generate/model/template.xml', 'utf-8');

    const output = nunjucks.renderString(template, jsonObject);

    fs.writeFileSync('output.xml', output);

    console.log(content);

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