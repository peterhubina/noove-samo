import OpenAI from "openai";
import fs from "fs";
import {zodResponseFormat} from "openai/helpers/zod";
import {schema} from "./ftSchema";
import path from "path";

import "dotenv/config";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const text = fs.readFileSync('text.txt', 'utf-8');

const modelFile = fs.readFileSync(path.join(__dirname, 'output', 'output-2024-08-21T19-14-27.287Z.json'), 'utf-8');
const model = JSON.parse(modelFile);

const entities = model.featureTypeArray.map((feature: { id: string; }) => feature.id);

async function generateEntities() {
    const completion = await client.beta.chat.completions.parse({
        model: 'gpt-4o-2024-08-06',
        messages: [
            {
                role: 'user',
                content: `
                    Read the Project Specification and the create a JSON schema for the project.
                    
                    The schema describes actions of entities in the application, their triggers and entity that it extends.
                    Defaultly the entity extends abs_ft_5000002.
                    The triggers describe what happens when an event occurs.
                    Default actions are: allocationCreated, allocationDeleted, allocationStateUpdated, allocationUpdated,
                    assignEstimation, inspectionDeleted, inspectionStateUpdated.
              
                    Entities available:
                    ${entities.join("\n")}
                    
                    Project Specification:
                    ${text}`
            },
        ],
        max_tokens: 2000,
        response_format: zodResponseFormat(schema, 'schema')
    });

    const message = completion.choices[0]?.message;
    console.log(message);

    if (message?.parsed) {
        fs.writeFileSync('entities.json', JSON.stringify(message.parsed, null, 2));
        console.log('done');
    } else {
        console.log('refuse', message.refusal);
    }
}

generateEntities();

//export default generateEntities;