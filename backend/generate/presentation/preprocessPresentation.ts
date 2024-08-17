import OpenAI from 'openai';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';

const nunjucks = require('nunjucks');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const projectSpecification = fs.readFileSync('../../text.txt', 'utf-8');
const namingConventions = fs.readFileSync('../../data/conventions.txt', 'utf-8');

const featureSymbology = fs.readFileSync('feature-symbology.txt', 'utf-8');
const reportsPages = fs.readFileSync('reports-pages.txt', 'utf-8');

const prompt = 'Analyze the documentation and project specification and output dynamic nunjucks XML template for presentation.xml';
const systemPrompt = `You are a helpful assistant designed to analyze documentation for presentation.xml configuration file.
                  You should generate a nunjucks XML template for presentation.xml based on the documentation and project specification.
                  It should be general template for presentation.xml file that can be used for any project. If there are any parts that are specific to the project, 
                  they should be dynamically rendered, otherwise you can use static parts in the XML.

                  GPT will then analyze project specification and ER diagram images, and based on those data it will
                  generate .json file with the necessary data for the presentation.xml file to be filled.

                  Project specification: ${projectSpecification}
                  Documentation:
                  Feature symbology:
                  ${featureSymbology}
                  Reports pages:
                  ${reportsPages}
                  You should preserve naming conventions that are described here: ${namingConventions}`;



async function main() {
  try {
    const messages: any = [
      {
        role: "system",
        content: `You are a helpful assistant designed to analyze all provided data and generate output that will be used
                  as prompt for generating custom project configuration. You will analyze implementation guide. 
                  Based on that data, you will generate a prompt that will summarize all this information from
                  the documentation, that will be necessary to understand how to generate configuration files model.xml, presentation.xml,
                  resource.xml, option.xml, thematization.xml, tool.xml. The output should be within 20,000 tokens.

                  Documentation:
                  
                  Feature symbology:
                  ${featureSymbology}
                  Reports pages:
                  ${reportsPages}
                  You should preserve naming conventions that are described here: ${namingConventions}`,
      },
      {
        role: 'user',
        content: [
          { type: "text", text: prompt },
        ]
      }
    ];

    const result = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages,
    });

    console.log(result.choices[0].message.content);

    const now = new Date();
    const dateString = now.toISOString().replace(/:/g, '-');
    const outputPath = path.join(__dirname, `output-${dateString}.txt`);

    fs.writeFileSync(outputPath, result.choices[0].message.content || '');

    console.log(`Output saved to ${outputPath}`);
  } catch (error) {
    console.error('Error generating or saving output:', error);
  }
}

main();