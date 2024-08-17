import { z } from 'zod';

// Common Schemas
const stringSchema = z.string();
const booleanSchema = z.boolean();
const numberSchema = z.number();

// Project Schema
const projectSchema = z.object({
    name: stringSchema,
    version: stringSchema,
    spatialInfo: z.object({
        baseUnit: stringSchema,
        srs: stringSchema,
        range: z.object({
            x: z.object({
                min: numberSchema,
                max: numberSchema,
            }),
            y: z.object({
                min: numberSchema,
                max: numberSchema,
            }),
        }),
        tolerance: numberSchema,
    }),
});

// System Schema
const systemSchema = z.object({
    id: stringSchema,
    version: z.object({
        model: stringSchema,
        minClient: stringSchema,
        minAS: stringSchema,
    }),
});

// Number Generator Schema
const numberGeneratorSchema = z.object({
    id: stringSchema,
    name: stringSchema,
    dbName: stringSchema,
    startValue: numberSchema,
    step: numberSchema,
});

// Container Schema
const containerSchema = z.object({
    id: stringSchema,
    name: stringSchema,
    dbName: stringSchema,
    versioned: booleanSchema,
});

// Column Schema for CodeList
const columnSchema = z.object({
    id: stringSchema,
    name: stringSchema,
    dbName: stringSchema,
    nillable: booleanSchema,
    maxLength: numberSchema,
});

// CodeList Schema
const codeListSchema = z.object({
    id: stringSchema,
    name: stringSchema,
    dbName: stringSchema,
    size: numberSchema,
    columnArray: z.array(columnSchema),
});

// Bounded Item Schema for CodeListBinding
const boundedItemSchema = z.object({
    dbName: stringSchema,
    refId: stringSchema,
});

// CodeList Binding Schema
const codeListBindingSchema = z.object({
    id: stringSchema,
    name: stringSchema,
    dbName: stringSchema,
    ordered: booleanSchema,
    boundedItemArray: z.array(boundedItemSchema),
});

// Attachment Type Schema
const attachmentTypeSchema = z.object({
    id: stringSchema,
    name: stringSchema,
    storage: stringSchema,
    description: stringSchema,
});

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

// Relation Role Schema
const relationRoleSchema = z.object({
    id: stringSchema,
    name: stringSchema,
    dbName: stringSchema,
    ftItems: z.array(z.object({
        refId: stringSchema,
    })),
});

// Association Schema
const assocSchema = z.object({
    id: stringSchema,
    name: stringSchema,
    masterRole: z.object({
        refId: stringSchema,
        cardinality: stringSchema,
    }),
    childRole: z.object({
        refId: stringSchema,
        cardinality: stringSchema,
    }),
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

// The Root Schema that brings everything together
export const rootSchema = z.object({
    project: projectSchema,
    system: systemSchema,
    numberGeneratorArray: z.array(numberGeneratorSchema),
    containerArray: z.array(containerSchema),
    codeListArray: z.array(codeListSchema),
    codeListBindingArray: z.array(codeListBindingSchema),
    attachmentTypeArray: z.array(attachmentTypeSchema),
    //featureTypeArray: z.array(featureTypeSchema),
    roleTypeArray: z.array(relationRoleSchema),
    assocTypeArray: z.array(assocSchema),
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

