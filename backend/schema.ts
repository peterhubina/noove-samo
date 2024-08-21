import { z } from 'zod';
import Case from 'case';

import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import fs from 'fs';



export const pageModule = () => z.discriminatedUnion('type', [
  z.object({
    type: z.literal('samo-browse'),
    allowNearbyFilter: z.boolean().optional(),
    allowAdvancedFilter: z.boolean().optional(),
    listDisplayOptions: z.array(z.enum(['auto', 'list3', 'table', 'tiles'])),
    defaultView: z.enum(['table', 'map']),
    entities: z.array(z.string()),
  }),
  z.object({
    type: z.literal('samo-planning-board'),
    resourceEntity: z.string(),
    taskEntity: z.string(),
    allocationEntity: z.string(),
  })
]);

export const page = () => z.object({
  title: z.string(),
  closeMenu: z.boolean().optional(),
  module: pageModule(),
}).transform((data) => ({
  id: `pg_${Case.camel(data.title)}`,
  ...data,
}));

export const detailModule = () => z.discriminatedUnion('type', [
  z.object({
    type: z.literal('samo-entity-properties-detail'),
  }),
  z.object({
    type: z.literal('related-entity-list'),
    entities: z.array(z.string()),
  }),
]);

export const editDetailModule = () => z.discriminatedUnion('type', [
  z.object({
    type: z.literal('samo-entity-properties-form'),
  }),
  z.object({
    type: z.literal('samo-tai-form'),
  }),
]);

export const detail = (section: () => z.ZodType) => z.object({
  title: z.string(),
  sections: z.array(section()),
});



export const entity = () => z.object({
  key: z.string(),
  detailDefault: detail(detailModule),
  editDefault: detail(editDetailModule),
  editInsert: detail(editDetailModule),
});

export const part = () => z.object({
  title: z.string(),
  pages: z.array(page()),
  entities: z.array(entity()),
}).transform((data) => ({
  id: `ap_${Case.camel(data.title)}`,
  ...data,
}));

export const schema = z.object({
  parts: z.array(part()),
});

export type Schema = z.infer<typeof schema>;


export async function generateSchema() {
  const start = performance.now();
  const client = new OpenAI();

  const text = fs.readFileSync('text.txt', 'utf-8');

  const completion = await client.beta.chat.completions.parse({
    model: 'gpt-4o-2024-08-06',
    messages: [
      {
        role: 'user',
        content: `
        Read the Project Specification and the create a JSON schema for the project.
        The schema describes application parts their corresponding pages.
        Each page has a specific module type with its own parameters.
        The modules often interact with entites in the database.
        Each part has a list of entities that are used in the pages.
        The schema also contains details for each entity.
        A detail represents a dialog that either shows or edits an entity.
  
        Description of modules:
        
        samo-browse:
        Displays a list of entities with options to filter and sort, the entites can be displayed in a table or on a map
        
        samo-planning-board:
        Displays a planning board where you can allocate resources to tasks at specific times creating an allocation entity that connects them
  
  
        Entities available:
        ft_boCompany
        ft_boPerson
        ft_boFish
        ft_boPond
        ft_boFishingGuard
        ft_boInspection
        ft_boInspectionType
        ft_boAllocation
        
        Project Specification:
        ${text}`
      },
    ],
    max_tokens: 2000,
    response_format: zodResponseFormat(schema, 'schema')
  });

  const message = completion.choices[0]?.message;

  if (message?.parsed) {
    fs.writeFileSync('schema.json', JSON.stringify(message.parsed, null, 2));
    console.log('done');
  } else {
    console.log('refuse', message.refusal);
  }

  console.log('time', performance.now() - start);

}


generateSchema();

