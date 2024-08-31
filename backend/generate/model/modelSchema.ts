import {z} from "zod";

/*
const rangeSchema = z.object({
  min: z.string(),
  max: z.string(),
});*/

const spatialInfoSchema = z.object({
    baseUnit: z.string(),
    srs: z.string(),
    range: z.object({
        x: z.string(),
        y: z.string(),
    }),
    tolerance: z.string(),
});

const projectSchema = z.object({
    name: z.string(),
    version: z.string(),
    spatialInfo: spatialInfoSchema,
});

const systemSchema = z.object({
    id: z.string(),
    version: z.object({
        model: z.string(),
        minClient: z.string(),
        minAS: z.string(),
    }),
});

const numberGeneratorSchema = z.object({
    id: z.string(),
    name: z.string(),
    dbName: z.string(),
    startValue: z.string(),
    step: z.string(),
});

const containerSchema = z.object({
    id: z.string(),
    name: z.string(),
    dbName: z.string(),
    versioned: z.string(),
});

const columnSchema = z.object({
    id: z.string(),
    name: z.string(),
    dbName: z.string(),
    nillable: z.string(),
    maxLength: z.string(),
});

const codeListSchema = z.object({
    id: z.string(),
    name: z.string(),
    dbName: z.string(),
    size: z.string(),
    columnArray: z.array(columnSchema),
});

const boundedItemSchema = z.object({
    dbName: z.string(),
    refId: z.string(),
});

const codeListBindingSchema = z.object({
    id: z.string(),
    name: z.string(),
    dbName: z.string(),
    ordered: z.string(),
    boundedItemArray: z.array(boundedItemSchema),
});

const attachmentTypeSchema = z.object({
    id: z.string(),
    name: z.string(),
    storage: z.string(),
    description: z.string(),
});

const attributeSchema = z.object({
    id: z.string(),
    name: z.string(),
    dbName: z.string(),
    nillable: z.string(),
    maxLength: z.string(),
});

const featureTypeSchema = z.object({
    id: z.string(),
    name: z.string(),
    parentId: z.string(),
    abstract: z.string(),
    container: z.string(),
    attributes: z.array(attributeSchema),
});

const ftItemSchema = z.object({
    refId: z.string(),
});

const relationRoleSchema = z.object({
    id: z.string(),
    name: z.string(),
    dbName: z.string(),
    ftItems: z.array(ftItemSchema),
});

const roleTypeSchema = z.object({
    id: z.string(),
    name: z.string(),
    dbName: z.string(),
    ftItems: z.array(ftItemSchema),
});

const masterRoleSchema = z.object({
    refId: z.string(),
    cardinality: z.string(),
});

const childRoleSchema = z.object({
    refId: z.string(),
    cardinality: z.string(),
});

const assocSchema = z.object({
    id: z.string(),
    name: z.string(),
    masterRole: masterRoleSchema,
    childRole: childRoleSchema,
});

const rootFeatureTypeSchema = z.object({
    id: z.string(),
    name: z.string(),
    abstract: z.string(),
});

export const modelSchema = z.object({
    project: projectSchema,
    system: systemSchema,
    numberGeneratorArray: z.array(numberGeneratorSchema),
    containerArray: z.array(containerSchema),
    codeListArray: z.array(codeListSchema),
    codeListBindingArray: z.array(codeListBindingSchema),
    attachmentTypeArray: z.array(attachmentTypeSchema),
    featureTypeArray: z.array(featureTypeSchema),
    roleTypeArray: z.array(relationRoleSchema),
    assocTypeArray: z.array(assocSchema),
    rootFeatureType: rootFeatureTypeSchema,
});