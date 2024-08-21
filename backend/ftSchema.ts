import {z} from 'zod';

export const trigger = () => z.object({
    type: z.string(),
    eventType: z.string(),
    include: z.array(z.string()),
    actions: z.array(z.string()),
});

export const triggers = () => z.record(trigger());

export const schema = z.object({
    extends: z.string(),
    triggers: z.array(triggers()),
    actions: z.array(z.any()).optional(),
    stateAttributes: z.array(z.any()).optional(),
    workflow: z.array(z.any()).optional(),
    conditions: z.array(z.any()).optional(),
    steps: z.array(z.any()).optional(),
})