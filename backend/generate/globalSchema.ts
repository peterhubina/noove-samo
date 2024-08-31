import { z } from "zod";

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
  ftItems: z.array(
    z.object({
      refId: stringSchema,
    })
  ),
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

// The Root Schema that brings everything together
export const rootSchema = z.object({
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
});

export type RootSchema = z.infer<typeof rootSchema>;
