import OpenAI from 'openai';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { zodResponseFormat } from "openai/helpers/zod";

import { rootSchema } from "./generate/globalSchema";
import createProjectConfiguration from "./copyFolderStructure";
import { generateSchema } from './schema';
import { generateEntities } from './generateEntities';
import generateMetadata from "./generateMainConfiguration";
import { generateDynamicApp } from './generate';

const nunjucks = require('nunjucks');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const projectSpecification = fs.readFileSync('text.txt', 'utf-8');
const namingConventions = fs.readFileSync('data/conventions.txt', 'utf-8');
const modelExample = fs.readFileSync('data/model.txt', 'utf-8');

const configurationPath = path.join(__dirname, 'configuration');

// Function to encode an image to Base64
const encodeImage = (imagePath: string): string => {
  const imageBuffer = fs.readFileSync(imagePath);
  return imageBuffer.toString('base64');
};

const prompt = 'Analyze the images with project specification and output as .json';

async function main() {
  const start = performance.now();

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
                  
                  Example of model.xml configuration file: ${modelExample}`,
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

    const content: string = result.choices[0].message?.content || '';
    let jsonOutput = JSON.parse(content);

    const modelTemplate = fs.readFileSync('generate/model/template.xml', 'utf-8');

    const model = nunjucks.renderString(modelTemplate, jsonOutput);

    const outputPath = path.join(__dirname, 'output', `output.json`);
    const sourceDir = path.resolve(__dirname, 'default-structure');

    // create project configuration folder with default structure
    createProjectConfiguration(sourceDir, configurationPath);
    console.log('Project structure created successfully.');

    // save model.xml
    fs.writeFileSync(path.join(configurationPath, 'lids-as', `model.xml`), model);

    if (!fs.existsSync(path.join(__dirname, 'output'))) {
      fs.mkdirSync(path.join(__dirname, 'output'));
    }

    fs.writeFileSync(outputPath, JSON.stringify(jsonOutput, null, 2));
    console.log(`model.json saved to ${outputPath}`);

    // generate entity .json files
    await generateEntities();

    await generateMetadata(outputPath);

    await generateSchema();
    await generateDynamicApp();

    // Log input and output token sizes
    // console.log(`Input token size: ${result.usage?.prompt_tokens || 'N/A'}`);
    // console.log(`Output token size: ${result.usage?.completion_tokens || 'N/A'}`);
  } catch (error) {
    console.error('Error generating or saving output:', error);
  }

  const end = performance.now();

  console.log('Project configuration created. Time to complete: ', end - start, ' seconds');
}

main();