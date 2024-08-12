import OpenAI from 'openai';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';

import {zodResponseFormat} from "openai/helpers/zod";
import {z} from "zod";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Schema for attributes, assuming attributes can have various types
const AttributeSchema = z.object({
  name: z.string(),            // The name of the attribute
  type: z.string(),            // The data type of the attribute
});

// Schema for associations between entities
const AssociationSchema = z.object({
  associationName: z.string(), // Name of the association
  targetEntity: z.string(),    // The target entity in the association
  associationType: z.enum(['one-to-one', 'one-to-many', 'many-to-one', 'many-to-many']),
  featureRefAttribute: z.string().optional(), // Reference attribute, if applicable
});

// Schema for an entity
const EntitySchema = z.object({
  entityName: z.string(),             // The name of the entity
  attributes: z.array(AttributeSchema), // List of attributes for the entity
  associations: z.array(AssociationSchema).optional()
});

// Schema for a code list item
const CodeListItemSchema = z.object({
  id: z.string(),           // The identifier of the code list item
  code: z.string(),         // The code value
  description: z.string(),  // Description of the code
});

// Schema for a code list
const CodeListSchema = z.object({
  codeListName: z.string(),        // The name of the code list
  items: z.array(CodeListItemSchema), // The list of codes in this code list
});

// General schema for the entire data model
const GeneralERDiagramSchema = z.object({
  entities: z.array(EntitySchema),
  codeLists: z.array(CodeListSchema).optional(),
});

export default GeneralERDiagramSchema;

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
        content: "You are a helpful assistant designed to analyze ER diagram images to output them as JSON.",
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
      response_format: zodResponseFormat(GeneralERDiagramSchema, 'schema'),
    });

    const content : string = result.choices[0].message?.content || '';
    let jsonObject = JSON.parse(content);

    const now = new Date();
    const dateString = now.toISOString().replace(/:/g, '-');
    const outputPath = path.join(__dirname, '..', 'output', `output-${dateString}.json`);

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