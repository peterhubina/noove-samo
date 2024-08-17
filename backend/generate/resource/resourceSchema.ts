import { z } from 'zod';

// Schemas for nested elements
const formatSchema = z.object({
    file: z.string().optional(),
    name: z.string(),
    extResId: z.string().optional(),
    separator: z.string().optional(),
    quote: z.string().optional(),
    escapeChar: z.string().optional(),
});

const customResourceSchema = z.object({
    id: z.string(),
    name: z.string(),
    formats: z.array(formatSchema),
});

const translationSchema = z.object({
    id: z.string(),
    name: z.string(),
    formats: z.array(formatSchema),
});

// Main schema for the entire JSON structure
const resourceSchema = z.object({
    symbolFonts: z
        .array(
            z.object({
                id: z.string(),
                name: z.string(),
                formats: z.array(formatSchema),
            })
        )
        .optional(),
    lineStyles: z
        .array(
            z.object({
                id: z.string(),
                name: z.string(),
                formats: z.array(formatSchema),
            })
        )
        .optional(),
    fillStyles: z
        .array(
            z.object({
                id: z.string(),
                name: z.string(),
                formats: z.array(formatSchema),
            })
        )
        .optional(),
    customResources: z
        .record(z.string(), z.array(customResourceSchema))
        .optional(),
    translations: z.array(translationSchema).optional(),
});

export default resourceSchema;

