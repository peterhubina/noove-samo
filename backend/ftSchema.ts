import {z} from 'zod';
import Case from "case";

const defaultActions = z.enum(['entityCreated', 'entityAttributeUpdated', 'entityDeleted']);

export const step = () => z.object({
    type: z.string(),
    source: z.string().regex(/^{@packageRoot\(@samo\/samo-training\)\/scripts\/ap_[\w-]+\/[\w-]+\.js}$/),
    arguments: z.record(z.any()).optional(),
});

export const steps = () => z.record(step());

export const condition = () => z.object({
    type: z.string(),
    operator: z.string(),
    value: z.number(),
    properties: z.array(z.string()),
});

export const conditions = () => z.array(condition());

export const state = () => z.object({
    transitions: z.array(z.string()).optional(),
    symbology: z.object({
        bgColor: z.string().optional(),
        fgColor: z.string().optional()
    }).optional(),
});

export const states = () => z.array(state());

export const workflow = () => z.object({
    entrypoint: z.string(),
    states: states(),
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
    conditions: z.array(z.any()).optional(),
    includeStates: z.array(z.string()).optional(),
});

export const actions = () => z.array(action());

export const trigger = () => z.object({
    type: z.string(),
    eventType: z.string(defaultActions),
    include: z.array(z.string()),
    actions: z.array(z.string()),
});

export const triggers = () => z.array(trigger());

export const entity = z.object({
    name: z.string(),
    extends: z.string().describe('abs_ft_5000002'),
    triggers: z.array(triggers()).optional(),
    actions: z.array(actions()).optional(),
    stateAttributes: z.array(stateAttributes()).optional(),
    workflow: z.array(workflow()).optional(),
    conditions: z.array(conditions()).optional(),
    steps: z.array(steps()).optional(),
}).transform((data) => ({
   fileName: `ap_${Case.camel(data.name)}.json`
}));

export const schema = z.object({
    entities: z.array(entity),
});