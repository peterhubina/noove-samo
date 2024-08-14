import OpenAI from 'openai';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';

import {zodResponseFormat} from "openai/helpers/zod";
import {z} from "zod";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const text = fs.readFileSync('model.txt', 'utf-8');
const prompt = `Analyze the .json file with ER diagram data and generate a .json schema for
                                          model.xml file, that will be created based on this data.`;

function pdfToBase64(filePath: string): string {
    // Read the file as a binary buffer
    const fileBuffer = fs.readFileSync(filePath);

    // Convert the buffer to a Base64 string
    const base64String = fileBuffer.toString('base64');

    return base64String;
}

// Example usage
//const filePath = 'path/to/your/file.pdf';
//const base64Pdf = pdfToBase64(filePath);

async function main() {
    try {
        const messages: any = [
            {
                role: "system",
                content: `You are a helpful assistant designed to analyze .json file
                          with ER diagram data and generate a .json schema for model.xml file, that will be created
                          based on this data.
                          
                          Here is an example of model.xml: ${text}`,
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
            response_format: { type: "json_object" }
            //response_format: zodResponseFormat(GeneralERDiagramSchema, 'schema'),
        });

        const content : string = result.choices[0].message?.content || '';
        let jsonObject = JSON.parse(content);

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