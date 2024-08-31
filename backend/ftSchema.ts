import { z } from 'zod';
import Case from "case";

const defaultActions = z.enum(['entityCreated', 'entityAttributeUpdated', 'entityDeleted']);

export const step = (entityName: string) => z.object({
    type: z.string(),
    arguments: z.array(z.string()).optional(),
}).transform((data) => {
    return {
        ...data,
        source: `{@packageRoot(@samo/configuration)}/scripts/ap_${Case.camel(entityName)}/${data.type}.js`
    };
});

export const action = (entityName: string) => z.object({
    title: z.string().optional(),
    access: z.array(z.string()),
    steps: z.array(step(entityName)),
    confirm: z.boolean().optional(),
    confirmMessage: z.string().optional(),
    includeConditions: z.array(z.string()).optional(),
    conditions: z.array(z.string()).optional(),
    includeStates: z.array(z.string()).optional(),
});

export const entity = () => z.object({
    name: z.string(),
    extends: z.string(),
    triggers: z.array(z.object({
        type: z.string(),
        eventType: z.string(defaultActions),
        include: z.array(z.string()),
        actions: z.array(z.string()),
    })).optional(),
    actions: z.array(action('')).optional(),
    stateAttributes: z.array(z.object({
        stateAttribute: z.string(),
        stateCodeProperty: z.string(),
        stateTitleProperty: z.string(),
    })).optional(),
    workflow: z.array(z.object({
        entrypoint: z.string(),
        states: z.array(z.object({
            transitions: z.array(z.string()).optional(),
            symbology: z.object({
                bgColor: z.string().optional(),
                fgColor: z.string().optional()
            }).optional(),
        })),
    })).optional(),
    conditions: z.array(z.object({
        type: z.string(),
        operator: z.string(),
        value: z.number().optional(),
        properties: z.array(z.string()),
    })).optional(),
    steps: z.array(step('')).optional(),
}).transform((data) => {
    const cleanedName = data.name.replace(/^ft_/, '');

    // Transform actions and steps
    const transformedActions = data.actions?.map(actionData => {
        return {
            ...actionData,
            steps: actionData.steps.map(stepData => step(cleanedName).parse(stepData))
        };
    });

    return {
        fileName: `ft_${Case.camel(cleanedName)}.json`,
        ...data,
        name: cleanedName,
        actions: transformedActions,
    };
});

export const schema = z.object({
    entities: z.array(entity()),
});
