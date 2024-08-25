import OpenAI from "openai";
import fs from "fs";
import {zodResponseFormat} from "openai/helpers/zod";
import {schema, entity as entitySchema} from "./ftSchema";
import path from "path";

import "dotenv/config";

interface Entity {
    fileName: string;
    name: string;
    extends: string;
    triggers: object;
    actions: object;
    stateAttributes: object;
    workflow: object;
    conditions: object;
    steps: object;
}

export async function generateEntities() {
    const client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const text = fs.readFileSync('text.txt', 'utf-8');

    const modelFile = fs.readFileSync(path.join(__dirname, 'output', 'output.json'), 'utf-8');
    const model = JSON.parse(modelFile);
    const entities = model.featureTypeArray.map((feature: { id: string; }) => feature.id);

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

    if (message?.parsed) {
        fs.writeFileSync('entities.json', JSON.stringify(message.parsed, null, 2));
        console.log('done');
    } else {
        console.log('refuse', message.refusal);
    }

    createFiles();
}

function createFiles() {
    const basePath = path.join(__dirname, 'configuration', 'lids-as', 'business-service', 'entities');

    const data = fs.readFileSync('entities.json', 'utf-8');
    const parsedData = JSON.parse(data);

    parsedData.entities.forEach((entity: Entity) => {

        //const parsedEntity = entitySchema().parse(entity);
        const { fileName, name, ...entityData } = entity;  // Destructure and exclude fileName and name
        const filePath = path.join(basePath, `ap_${name}`, fileName);

        // Write the JSON file
        fs.writeFileSync(filePath, JSON.stringify(entityData, null, 2));
        console.log(`Created ${fileName}`);
    });

    console.log('All entities have been created.');
}

createFiles();