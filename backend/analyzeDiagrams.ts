import OpenAI from 'openai';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import {zodResponseFormat} from "openai/helpers/zod";
import {modelSchema} from "./generate/model/modelSchema";
import generate from "./generateMainConfiguration";

import {rootSchema} from "./generate/globalSchema";

const nunjucks = require('nunjucks');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const projectSpecification = fs.readFileSync('text.txt', 'utf-8');
const namingConventions = fs.readFileSync('data/conventions.txt', 'utf-8');
const configurationFiles = fs.readFileSync('data/model.txt', 'utf-8');

// Function to encode an image to Base64
const encodeImage = (imagePath: string): string => {
  const imageBuffer = fs.readFileSync(imagePath);
  return imageBuffer.toString('base64');
};

const prompt = 'Analyze the images with project specification and output as .json';

const userPrompt = `The .json file should contain all the necessary data to generate these configuration files:
                    model.xml, option.xml, presentation.xml, resouce.xml, thematization.xml, and tool.xml.`

async function main() {
  try {
    const imagesDir = path.join(__dirname, 'images');
    const imageFiles = fs.readdirSync(imagesDir);

    const imageMessages = imageFiles.map((fileName: string) => {
      console.log(`Processing image: ${fileName}`);
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
                  
                  Example of possible entities in the ER diagrams:
                  ft_boCompany
                  ft_boPerson
                  ft_boSponsor
                  ft_boFish
                  ft_boPond
                  ft_boExtParty
                  ft_boFishingGuard
                  ft_boInspection
                  ft_boInspectionType
                  ft_boAllocation
                  
                  Project specification: ${projectSpecification}
                  You should preserve naming conventions that are described here: ${namingConventions}.
                  
                  The .json file should contain all the necessary data to generate model.xml configuration file.
                  
                  Example of project configuration files: ${configurationFiles}`,
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
      response_format: zodResponseFormat(rootSchema, 'schema'),
    });

    const content : string = result.choices[0].message?.content || '';
    let jsonObject = JSON.parse(content);

    const template = fs.readFileSync('generate/model/template.xml', 'utf-8');

    const output = nunjucks.renderString(template, jsonObject);

    const now = new Date();
    const dateString = now.toISOString().replace(/:/g, '-');
    const outputPath = path.join(__dirname, 'output', `output-${dateString}.json`);

    fs.writeFileSync(path.join(__dirname, 'output', `model-${dateString}.xml`), output);

    if (!fs.existsSync(path.join(__dirname, 'output'))) {
      fs.mkdirSync(path.join(__dirname, 'output'));
    }

    fs.writeFileSync(outputPath, JSON.stringify(jsonObject, null, 2));
    console.log(`Output saved to ${outputPath}`);

    generate(outputPath);

    // Log input and output token sizes
    console.log(`Input token size: ${result.usage?.prompt_tokens || 'N/A'}`);
    console.log(`Output token size: ${result.usage?.completion_tokens || 'N/A'}`);
  } catch (error) {
    console.error('Error generating or saving output:', error);
  }
}

main();