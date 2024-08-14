import { z } from 'zod';

// Schemas for nested elements
const onlineResourceSchema = z.object({
    href: z.string().optional(),
});

const externalGraphicSchema = z.object({
    onlineResource: onlineResourceSchema.optional(),
    format: z.any().optional(), // Adjust if 'Format' has specific content
});

const graphicSchema = z.object({
    externalGraphic: externalGraphicSchema.optional(),
    opacity: z.string().optional(),
});

const graphicStrokeSchema = z.object({
    graphic: graphicSchema.optional(),
});

const svgParameterSchema = z.object({
    name: z.string(),
    value: z.string(), // Or adjust based on possible parameter value types
});

const strokeSchema = z.object({
    graphicStroke: graphicStrokeSchema.optional(),
    svgParameter: z.array(svgParameterSchema).optional(),
});

const fillSchema = z.object({
    svgParameter: z.array(svgParameterSchema).optional(),
    fillStyle: z.string().optional(),
});

const graphicFillSchema = z.object({
    graphic: graphicSchema.optional(),
});

const patternFillSchema = z.object({
    graphicFill: graphicFillSchema.optional(),
    svgParameter: z.array(svgParameterSchema).optional(),
});

const fontSchema = z.object({
    'font-family': z.string().optional(),
    'font-style': z.string().optional(),
    'font-weight': z.string().optional(),
});

const maskStrokeSchema = z.object({
    graphicStroke: graphicStrokeSchema.optional(),
    svgParameter: z.array(svgParameterSchema).optional(),
});

const maskSchema = z.object({
    style: z.string().optional(),
    shape: z.string().optional(),
    stroke: maskStrokeSchema.optional(),
});

const foregroundBackgroundSchema = z.object({
    rgbColor: z.string().optional(),
    opacity: z.string().optional(),
});

const outputFormatSchema = z.object({
    value: z.string(),
    default: z.boolean().optional(),
});

const inputParameterSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    defaultValue: z.string().optional(),
    dataType: z
        .object({
            type: z.enum(["date", "decimal", "string", "codeListRefExt"]),
            precision: z.number().optional(),
            scale: z.number().optional(),
            maxLength: z.number().optional(),
            codeListRef: z
                .object({
                    refId: z.string(),
                    displayColumn: z.string(),
                })
                .optional(),
        })
        .optional(),
    nillable: z.boolean().optional(),
});


const reportSchema = z.object({
    id: z.string(),
    name: z.string(),
    orientation: z.string().optional(),
    outputFormats: z.array(outputFormatSchema),
    templateName: z.string(),
    inputParameters: z.array(inputParameterSchema).optional(),
    description: z.string().optional(),
    attributeTemplateName: z.string().optional(),
});

const lineWeightSchema = z.object({
    display: z.string(),
    print: z.string(),
});

const dwgLineWeightSchema = z.object({
    display: z.string(),
    dwg: z.string(),
});

// Main schema for the entire JSON structure
const presentationSchema = z.object({
    emptyTextLabel: z.string().optional(),
    defaultDisplayOverlapWidth: z.string().optional(),
    lineSymbolizer: z.object({
        stroke: strokeSchema.optional(),
    }).optional(),
    polygonSymbolizer: z.object({
        fill: fillSchema.optional(),
        patternFill: patternFillSchema.optional(),
        stroke: strokeSchema.optional(),
    }).optional(),
    pointSymbolizer: z.object({
        graphic: graphicSchema.optional(),
        rgbColor: z.string().optional(),
        symbolHeight: z.string().optional(),
    }).optional(),
    textSymbolizer: z.object({
        font: fontSchema.optional(),
        fill: fillSchema.optional(),
        fontHeight: z.string().optional(),
        lineSpacing: z.string().optional(),
        mask: maskSchema.optional(),
    }).optional(),
    binaryRasterSymbolizer: z.object({
        foreground: foregroundBackgroundSchema.optional(),
        background: foregroundBackgroundSchema.optional(),
    }).optional(),
    rasterSymbolizer: z.object({
        opacity: z.string().optional(),
    }).optional(),
    simpleVectorSymbolizer: z.object({
        rgbColor: z.string().optional(),
        opacity: z.string().optional(),
    }).optional(),
    reports: z.array(reportSchema).optional(),
    defaultNortharrow: z.object({
        pointSymbolizer: z
            .object({
                graphic: graphicSchema.optional(),
                rgbColor: z.string().optional(),
                symbolHeight: z.string().optional(),
            })
            .optional(),
    }).optional(),
    lineWeights: z.array(lineWeightSchema).optional(),
    dwgLineWeights: z.array(dwgLineWeightSchema).optional(),
});

export default presentationSchema;
