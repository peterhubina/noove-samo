import {z} from 'zod';
import Case from "case";

const defaultActions = z.enum(['entityCreated', 'entityAttributeUpdated', 'entityDeleted']);

export const step = () => z.object({
    type: z.string(),
    //source: z.string().regex(/^{@packageRoot\(@samo\/samo-training\)\/scripts\/ap_[\w-]+\/[\w-]+\.js}$/),
    arguments: z.array(z.string()).optional(),
});

export const condition = () => z.object({
    type: z.string(),
    operator: z.string(),
    value: z.number().optional(),
    properties: z.array(z.string()),
});

export const state = () => z.object({
    transitions: z.array(z.string()).optional(),
    symbology: z.object({
        bgColor: z.string().optional(),
        fgColor: z.string().optional()
    }).optional(),
});

export const workflow = () => z.object({
    entrypoint: z.string(),
    states: z.array(state()),
});

export const stateAttributes = () => z.object({
    stateAttribute: z.string(),
    stateCodeProperty: z.string(),
    stateTitleProperty: z.string(),
});

export const action = () => z.object({
    title: z.string().optional(),
    access: z.array(z.string()),
    steps: z.array(z.string()),
    confirm: z.boolean().optional(),
    confirmMessage: z.string().optional(),
    includeConditions: z.array(z.string()).optional(),
    conditions: z.array(z.string()).optional(),
    includeStates: z.array(z.string()).optional(),
});

export const trigger = () => z.object({
    type: z.string(),
    eventType: z.string(defaultActions),
    include: z.array(z.string()),
    actions: z.array(z.string()),
});

export const entity = () => z.object({
    name: z.string(),
    extends: z.string(),
    triggers: z.array(trigger()).optional(),
    actions: z.array(action()).optional(),
    stateAttributes: z.array(stateAttributes()).optional(),
    workflow: z.array(workflow()).optional(),
    conditions: z.array(condition()).optional(),
    steps: z.array(step()).optional(),
}).transform((data) => {
    const cleanedName = data.name.replace(/^ft_/, '');

    return {
        fileName: `ft_${Case.camel(cleanedName)}.json`,
        ...data,
        name: cleanedName,
    }
});

export const schema = z.object({
    entities: z.array(entity()),
});