import { z } from "zod";

// Define the StringAttribute schema (for string attributes with a maxLength)
const StringAttributeSchema = z.object({
    id: z.string(),
    name: z.string(),
    dbName: z.string(),
    nillable: z.boolean(),
    maxLength: z.number().optional(),
});

// Define the FeatureType schema (which includes attributes)
const FeatureTypeSchema = z.object({
    id: z.string(),
    name: z.string(),
    parentId: z.string().optional(),
    abstract: z.boolean(),
    container: z.string().optional(),
    attributes: z.array(StringAttributeSchema).optional(),
});

// Define the OutputFormat schema
const OutputFormatSchema = z.object({
    name: z.string(),
    default: z.boolean().optional(),
});

// Define the ReportQuery schema
const ReportQuerySchema = z.object({
    featureType: z.string(),
    attributes: z.array(z.string()), // Referring to attribute IDs from model.xml
    filter: z.string(),
    orderByAttribute: z.string(),
    orderByFeatureType: z.string(),
});

// Define the Report schema
const ReportSchema = z.object({
    id: z.string(),
    name: z.string(),
    orientation: z.string(),
    description: z.string(),
    type: z.string(),
    outputFormats: z.array(OutputFormatSchema),
    templateName: z.string(),
    featureTypes: z.array(FeatureTypeSchema).optional(),
    reportQueries: z.array(ReportQuerySchema).optional(),
});

// Define the main Presentation schema
const PresentationSchema = z.object({
    reports: z.array(ReportSchema),
    lineWeights: z.array(z.object({
        display: z.number(),
        print: z.number(),
    })).optional(),
    dwgLineWeights: z.array(z.object({
        display: z.number(),
        dwg: z.number(),
    })).optional(),
});

export default PresentationSchema;
