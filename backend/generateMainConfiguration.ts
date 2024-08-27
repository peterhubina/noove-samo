import OpenAI from 'openai';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import {zodResponseFormat} from "openai/helpers/zod";
import {rootSchema} from "./generate/secondSchema";

const nunjucks = require('nunjucks');

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const projectSpecification = fs.readFileSync('text.txt', 'utf-8');
const namingConventions = fs.readFileSync('data/conventions.txt', 'utf-8');
const configurationFiles = fs.readFileSync('data/configurationFiles.txt', 'utf-8');

const prompt = 'Analyze the project specification and output as .json';

async function generateMetadata(modelPath: string) {
    try {
        const model = fs.readFileSync(modelPath, 'utf-8');

        const messages: any = [
            {
                role: "system",
                content: `You are a helpful assistant designed to analyze Project Specification to create a .json
                          with necessary properties for the project.
                  
                  Project specification: ${projectSpecification}
                  You should preserve naming conventions that are described here: ${namingConventions}.
                  
                  .json file with data for model.xml: ${model}
                  
                  The .json file should contain all the necessary data to generate these configuration files:
                    option.xml, presentation.xml, resouce.xml, thematization.xml, and tool.xml.
                  
                  Example of project configuration files: ${configurationFiles}`,
            },
            {
                role: 'user',
                content: [
                    { type: "text", text: prompt },
                ]
            }
        ];

        const result = await client.chat.completions.create({
            model: 'gpt-4o-2024-08-06',
            messages: messages,
            response_format: zodResponseFormat(rootSchema, 'schema'),
            max_tokens: 4000
        });

        const content : string = result.choices[0].message?.content || '';
        let jsonObject = JSON.parse(content);

        const outputPath = path.join(__dirname, 'output', `metadata.json`);

        if (!fs.existsSync(path.join(__dirname, 'output'))) {
            fs.mkdirSync(path.join(__dirname, 'output'));
        }

        fs.writeFileSync(outputPath, JSON.stringify(jsonObject, null, 2));
        console.log(`metadata.json saved to ${outputPath}`);

        // Log input and output token sizes
        console.log(`Input token size: ${result.usage?.prompt_tokens || 'N/A'}`);
        console.log(`Output token size: ${result.usage?.completion_tokens || 'N/A'}`);

        await renderAndSaveXML(jsonObject);
    } catch (error) {
        console.error('Error generating or saving output:', error);
    }
}

// Function to render and save XML files
async function renderAndSaveXML(jsonData: any) {
    const templates = [
        { templatePath: 'generate/option/optionTemplate.xml', outputFileName: 'option.xml' },
        { templatePath: 'generate/presentation/presentationTemplate.xml', outputFileName: 'presentation.xml' },
        { templatePath: 'generate/resource/resourceTemplate.xml', outputFileName: 'resource.xml' },
        { templatePath: 'generate/thematization/thematizationTemplate.xml', outputFileName: 'thematization.xml' },
        { templatePath: 'generate/tool/toolTemplate.xml', outputFileName: 'tool.xml' }
    ];

    const outputDir = path.join(__dirname, 'output');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    for (const { templatePath, outputFileName } of templates) {
        const template = fs.readFileSync(path.join(__dirname, templatePath), 'utf-8');
        const output = nunjucks.renderString(template, jsonData);
        const outputPath = path.join(__dirname, 'configuration', 'lids-as', outputFileName);
        fs.writeFileSync(outputPath, output);
        console.log(`Output saved to ${outputPath}`);
    }
}

export default generateMetadata;