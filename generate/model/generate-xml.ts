import { create } from 'xmlbuilder2';
import fs from 'fs';
import path from "path";

interface Attribute {
    name: string;
    type: string;
}

interface Association {
    associationName: string;
    targetEntity: string;
    associationType: string;
    featureRefAttribute: string;
}

interface Entity {
    entityName: string;
    attributes: Attribute[];
    associations?: Association[];
}

interface CodeListItem {
    id: string;
    code: string;
    description: string;
}

interface CodeList {
    codeListName: string;
    items: CodeListItem[];
}

interface Data {
    entities: Entity[];
    codeLists: CodeList[];
}

const dataFilePath = path.join(__dirname, '..', '..', 'output', 'output-model.json');
const rawData = fs.readFileSync(dataFilePath, 'utf8');
const data: Data = JSON.parse(rawData);

function generateXML(data: Data): string {
    const root = create({ version: '1.0' })
        .ele('ber:model', {
            xmlns: {
                xlink: 'http://www.w3.org/1999/xlink',
                xsi: 'http://www.w3.org/2001/XMLSchema-instance',
                se: 'http://www.opengis.net/se',
                ogc: 'http://www.opengis.net/ogc',
                sld: 'http://www.opengis.net/sld',
                ber: 'http://www.berit.com/ber'
            }
        });

    // Add entities (containers in the model.xml)
    const containerArrayElement = root.ele('ber:containerArray');
    data.entities.forEach(entity => {
        const entityElement = containerArrayElement.ele('ber:container', { name: entity.entityName, id: `ct_${entity.entityName}`, dbName: `CT_${entity.entityName.toUpperCase()}`, versioned: "true" });

        // Add attributes (as ber:attribute elements)
        const attributesElement = entityElement.ele('ber:featureAttributeArray');
        entity.attributes.forEach(attr => {
            attributesElement.ele('ber:attribute', { name: attr.name, dbName: attr.name.toUpperCase(), nillable: "true" });
        });

        // Add associations if they exist (as ber:featureRefAttribute elements)
        if (entity.associations && entity.associations.length > 0) {
            entity.associations.forEach(assoc => {
                attributesElement.ele('ber:featureRefAttribute', {
                    name: assoc.associationName,
                    dbName: assoc.associationName.toUpperCase(),
                    nillable: "true"
                });
            });
        }
    });

    // Add code lists (as ber:codeListArray elements)
    const codeListsElement = root.ele('ber:codeListArray');
    data.codeLists.forEach(codeList => {
        const codeListElement = codeListsElement.ele('ber:codeList', { name: codeList.codeListName, id: `cl_${codeList.codeListName}`, dbName: `CL_${codeList.codeListName.toUpperCase()}`, size: "small", hierarchical: "false" });

        const columnArrayElement = codeListElement.ele('ber:columnArray');
        codeList.items.forEach(item => {
            const columnElement = columnArrayElement.ele('ber:column', { id: item.id, name: item.code, dbName: item.code.toUpperCase(), nillable: "true", primaryKey: "false", display: "false" });
            columnElement.ele('ber:dataType').ele('ber:string', { maxLength: "30" });
        });
    });

    return root.end({ prettyPrint: true });
}

// Generate the XML string
const xmlString = generateXML(data);

// Write the XML string to a file
fs.writeFileSync('output.xml', xmlString, 'utf8');

console.log('XML file has been generated successfully.');