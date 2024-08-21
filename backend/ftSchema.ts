import {z} from 'zod';

export const step = () => z.object({
    type: z.string(),
    source: z.string(),
    arguments: z.record(z.any()).optional(),
});

export const steps = () => z.record(step());

export const condition = () => z.object({
    type: z.string(),
    operator: z.string(),
    value: z.number(),
    properties: z.array(z.string()),
});

export const conditions = () => z.record(condition());

export const state = () => z.object({
    transitions: z.array(z.string()).optional(),
    symbology: z.object({
        bgColor: z.string().optional(),
        fgColor: z.string().optional()
    }).optional(),
});

export const states = () => z.record(state());

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

export const actions = () => z.record(action());

export const trigger = () => z.object({
    type: z.string(),
    eventType: z.string(),
    include: z.array(z.string()),
    actions: z.array(z.string()),
});

export const triggers = () => z.record(trigger());

export const schema = z.object({
    extends: z.string().describe('abs_ft_5000002'),
    triggers: z.array(triggers()).optional(),
    actions: z.array(actions()).optional(),
    stateAttributes: z.array(stateAttributes()).optional(),
    workflow: z.array(workflow()).optional(),
    conditions: z.array(conditions()).optional(),
    steps: z.array(steps()).optional(),
})