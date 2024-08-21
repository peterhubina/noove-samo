import {z} from 'zod';

export const action = () => z.object({
    access: z.array(z.string()),
    steps: z.array(z.string()),
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
    extends: z.string(),
    triggers: z.array(triggers()).optional(),
    actions: z.array(actions()).optional(),
    stateAttributes: z.array(z.any()).optional(),
    workflow: z.array(z.any()).optional(),
    conditions: z.array(z.any()).optional(),
    steps: z.array(z.any()).optional(),
})