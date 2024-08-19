import {z} from "zod";

const stringSchema = z.string();
const booleanSchema = z.boolean();
const numberSchema = z.number();

// Feature Attribute Schema
const featureAttributeSchema = z.object({
    id: stringSchema,
    name: stringSchema,
    dbName: stringSchema,
    nillable: booleanSchema,
    maxLength: numberSchema,
});

// Feature Type Schema
const featureTypeSchema = z.object({
    id: stringSchema,
    name: stringSchema,
    parentId: stringSchema,
    abstract: booleanSchema,
    container: stringSchema,
    attributes: z.array(featureAttributeSchema),
});

// Report Schema (for presentation.xml)
const reportSchema = z.object({
    type: stringSchema,
    id: stringSchema,
    name: stringSchema,
    orientation: stringSchema,
    description: stringSchema,
    outputFormats: z.array(z.object({
        name: stringSchema,
        default: booleanSchema,
    })),
    templateName: stringSchema,
    featureTypes: z.array(featureTypeSchema),
    reportQueries: z.array(z.object({
        featureType: stringSchema,
        attributes: z.array(stringSchema),
        filter: stringSchema,
        orderByAttribute: stringSchema,
        orderByFeatureType: stringSchema,
    })).optional(),
});

// Resource-related schemas
const lineStyleSchema = z.object({
    id: stringSchema,
    name: stringSchema,
    pattern: stringSchema,
});

const symbolFontSchema = z.object({
    id: stringSchema,
    name: stringSchema,
    file: stringSchema,
});

const iconSchema = z.object({
    id: stringSchema,
    name: stringSchema,
    file: stringSchema,
});

const translationFormatSchema = z.object({
    file: stringSchema,
    name: stringSchema,
    separator: stringSchema,
    quote: stringSchema,
    escapeChar: stringSchema,
});

const translationSchema = z.object({
    id: stringSchema,
    name: stringSchema,
    formatArray: z.array(translationFormatSchema),
});

// Dynamic Symbology Schema (for thematization.xml)
const dynamicSymbologyRuleSchema = z.object({
    condition: stringSchema,
    symbology: stringSchema,
});

const dynamicSymbologySchema = z.object({
    id: stringSchema,
    name: stringSchema,
    ruleArray: z.array(dynamicSymbologyRuleSchema),
});

const themeSchema = z.object({
    id: stringSchema,
    name: stringSchema,
    dynamicSymbology: stringSchema,
});

// Tool-related schemas
const toolSchema = z.object({
    id: stringSchema,
    name: stringSchema,
    description: stringSchema,
});

const toolboxSchema = z.object({
    id: stringSchema,
    name: stringSchema,
    tools: z.array(stringSchema),
});

const ribbonPageSchema = z.object({
    id: stringSchema,
    name: stringSchema,
    toolboxes: z.array(stringSchema),
});

export const rootSchema = z.object({
    reports: z.array(reportSchema).optional(),
    lineStyleArray: z.array(lineStyleSchema).optional(),
    symbolFontArray: z.array(symbolFontSchema).optional(),
    iconArray: z.array(iconSchema).optional(),
    translationsArray: z.array(translationSchema).optional(),
    dynamicSymbologyArray: z.array(dynamicSymbologySchema).optional(),
    themeArray: z.array(themeSchema).optional(),
    toolArray: z.array(toolSchema).optional(),
    toolboxArray: z.array(toolboxSchema).optional(),
    ribbonPageArray: z.array(ribbonPageSchema).optional(),
});