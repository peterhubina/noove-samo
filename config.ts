import { create } from 'xmlbuilder2';
import fs from 'fs';

// Load configuration JSON
const config = JSON.parse(fs.readFileSync('data/config.json', 'utf-8'));

// Create XML root
const root = create().ele('ber:model', {
  'xmlns:xlink': 'http://www.w3.org/1999/xlink',
  'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
  'xmlns:se': 'http://www.opengis.net/se',
  'xmlns:ogc': 'http://www.opengis.net/ogc',
  'xmlns:sld': 'http://www.opengis.net/sld',
  'xmlns:ber': 'http://www.berit.com/ber'
});

// Add project element
if (config.project) {
  const project = root.ele('ber:project', { name: config.project.name, version: config.project.version });
  if (config.project.spatialInfo) {
    const spatialInfo = project.ele('ber:spatialInfo', { baseUnit: config.project.spatialInfo.baseUnit, srs: config.project.spatialInfo.srs });
    if (config.project.spatialInfo.range) {
      const range = spatialInfo.ele('ber:range');
      range.ele('ber:x', { min: config.project.spatialInfo.range.x.min, max: config.project.spatialInfo.range.x.max });
      range.ele('ber:y', { min: config.project.spatialInfo.range.y.min, max: config.project.spatialInfo.range.y.max });
    }
    spatialInfo.ele('ber:tolerance').txt(config.project.spatialInfo.tolerance);
  }
}

// Add system element
if (config.system) {
  const system = root.ele('ber:system', { id: config.system.id });
  if (config.system.version) {
    const version = system.ele('ber:version');
    version.ele('ber:model').txt(config.system.version.model);
    version.ele('ber:minClient').txt(config.system.version.minClient);
    version.ele('ber:minAS').txt(config.system.version.minAS);
  }
}

// Add numberGeneratorArray
if (config.numberGeneratorArray) {
  const numberGeneratorArray = root.ele('ber:numberGeneratorArray');
  config.numberGeneratorArray.forEach((generator: any) => {
    const numberGenerator = numberGeneratorArray.ele('ber:numberGenerator', {
      id: generator.id,
      name: generator.name,
      dbName: generator.dbName,
      startValue: generator.startValue,
      step: generator.step
    });
    if (generator.description) {
      numberGenerator.ele('ber:description').txt(generator.description);
    }
  });
}

// Add containerArray
if (config.containerArray) {
  const containerArray = root.ele('ber:containerArray');
  config.containerArray.forEach((container: any) => {
    const containerElem = containerArray.ele('ber:container', {
      id: container.id,
      name: container.name,
      dbName: container.dbName,
      versioned: container.versioned
    });
    if (container.description) {
      containerElem.ele('ber:description').txt(container.description);
    }
  });
}

// Add codeListArray
if (config.codeListArray) {
  const codeListArray = root.ele('ber:codeListArray');
  config.codeListArray.forEach((codeList: any) => {
    const codeListElem = codeListArray.ele('ber:codeList', {
      id: codeList.id,
      name: codeList.name,
      dbName: codeList.dbName,
      size: codeList.size,
      hierarchical: codeList.hierarchical
    });

    if (codeList.description) {
      codeListElem.ele('ber:description').txt(codeList.description);
    }

    const columnArray = codeListElem.ele('ber:columnArray');
    codeList.columnArray.forEach((column: any) => {
      const columnElem = columnArray.ele('ber:column', {
        id: column.id,
        name: column.name,
        dbName: column.dbName,
        nillable: column.nillable,
        primaryKey: column.primaryKey,
        display: column.display
      });

      if (column.description) {
        columnElem.ele('ber:description').txt(column.description);
      }

      const dataType = columnElem.ele('ber:dataType');
      if (column.dataType) {
        if (column.dataType.string) {
          dataType.ele('ber:string', { maxLength: column.dataType.string.maxLength });
        } else if (column.dataType.decimal) {
          dataType.ele('ber:decimal', { precision: column.dataType.decimal.precision, scale: column.dataType.decimal.scale });
        }
      }
    });
  });
}

// Add codeListBindingArray
if (config.codeListBindingArray) {
  const codeListBindingArray = root.ele('ber:codeListBindingArray');
  config.codeListBindingArray.forEach((binding: any) => {
    const bindingElem = codeListBindingArray.ele('ber:codeListBinding', {
      id: binding.id,
      name: binding.name,
      dbName: binding.dbName,
      ordered: binding.ordered
    });

    const boundedItemArray = bindingElem.ele('ber:boundedItemArray');
    binding.boundedItemArray.forEach((item: any) => {
      boundedItemArray.ele('ber:boundedItem', { dbName: item.dbName }).ele('ber:codeList', { refId: item.refId });
    });
  });
}

// Add attachmentTypeArray
if (config.attachmentTypeArray) {
  const attachmentTypeArray = root.ele('ber:attachmentTypeArray');
  config.attachmentTypeArray.forEach((attachment: any) => {
    const attachmentElem = attachmentTypeArray.ele('ber:attachmentType', {
      id: attachment.id,
      name: attachment.name,
      storage: attachment.storage
    });

    if (attachment.description) {
      attachmentElem.ele('ber:description').txt(attachment.description);
    }
  });
}

// Add featureTypeArray
if (config.featureTypeArray) {
  const featureTypeArray = root.ele('ber:featureTypeArray');
  config.featureTypeArray.forEach((featureType: any) => {
    const featureTypeElem = featureTypeArray.ele('ber:featureType', {
      id: featureType.id,
      name: featureType.name,
      parentId: featureType.parentId,
      abstract: featureType.abstract
    });

    if (featureType.description) {
      featureTypeElem.ele('ber:description').txt(featureType.description);
    }

    if (featureType.container) {
      featureTypeElem.ele('ber:container', { refId: featureType.container.refId });
    }

    const featureAttributeArray = featureTypeElem.ele('ber:featureAttributeArray');
    featureType.featureAttributeArray.forEach((attribute: any) => {
      const attributeElem = featureAttributeArray.ele('ber:attribute', {
        id: attribute.id,
        name: attribute.name,
        dbName: attribute.dbName,
        nillable: attribute.nillable
      });

      if (attribute.description) {
        attributeElem.ele('ber:description').txt(attribute.description);
      }

      const dataType = attributeElem.ele('ber:dataType');
      if (attribute.dataType) {
        if (attribute.dataType.string) {
          dataType.ele('ber:string', { maxLength: attribute.dataType.string.maxLength });
        } else if (attribute.dataType.decimal) {
          dataType.ele('ber:decimal', { precision: attribute.dataType.decimal.precision, scale: attribute.dataType.decimal.scale });
        } else if (attribute.dataType.date) {
          dataType.ele('ber:date');
        } else if (attribute.dataType.shortDate) {
          dataType.ele('ber:shortDate');
        } else if (attribute.dataType.codeListRef) {
          dataType.ele('ber:codeListRef', { refId: attribute.dataType.codeListRef.refId, displayColumn: attribute.dataType.codeListRef.displayColumn });
        }
      }
    });

    // Add forms if they exist
    if (featureType.formArray) {
      const formArray = featureTypeElem.ele('ber:formArray');
      featureType.formArray.forEach((form: any) => {
        const formElem = formArray.ele('ber:form', { id: form.id, name: form.name });
        const fieldGroup = formElem.ele('ber:fieldGroup');
        form.fieldGroup.forEach((field: any) => {
          fieldGroup.ele('ber:field', { refId: field.refId, readOnly: field.readOnly });
        });
      });
    }

    // Add assigned forms if they exist
    if (featureType.assignedForms) {
      const assignedForms = featureTypeElem.ele('ber:assignedForms');
      featureType.assignedForms.forEach((assignedForm: any) => {
        assignedForms.ele('ber:assignedForm', { usage: assignedForm.usage, refId: assignedForm.refId });
      });
    }
  });
}

// Add roleTypeArray
if (config.roleTypeArray) {
  const roleTypeArray = root.ele('ber:roleTypeArray');
  config.roleTypeArray.forEach((roleType: any) => {
    const roleTypeElem = roleTypeArray.ele('ber:relationRole', {
      id: roleType.id,
      name: roleType.name,
      dbName: roleType.dbName
    });

    roleType.ftItem.forEach((ftItem: any) => {
      roleTypeElem.ele('ber:ftItem', { refId: ftItem.refId });
    });
  });
}

// Add assocTypeArray
if (config.assocTypeArray) {
  const assocTypeArray = root.ele('ber:assocTypeArray');
  config.assocTypeArray.forEach((assoc: any) => {
    const assocElem = assocTypeArray.ele('ber:featureRefRelationAssoc', {
      id: assoc.id,
      name: assoc.name
    });

    const masterRole = assocElem.ele('ber:masterRole', { refId: assoc.masterRole.refId, cardinality: assoc.masterRole.cardinality });
    const childRole = assocElem.ele('ber:childRole', { refId: assoc.childRole.refId, cardinality: assoc.childRole.cardinality });
  });
}

// End XML creation
const xml = root.end({ prettyPrint: true });

// Save the XML to a file
fs.writeFileSync('model.xml', xml, 'utf-8');

console.log('XML file has been created successfully!');
