import { create } from 'xmlbuilder2';
// @ts-ignore
import fs from 'fs';
import generateNumberGeneratorArray from './generateNumberGeneratorArray';
import generateContainerArray from './generateContainerArray';
import generateCodeListArray from './generateCodeListArray';
import generateCodeListBindingArray from './generateCodeListBindingArray';
import generateAttachmentTypeArray from './generateAttachmentTypeArray';
import generateFeatureTypeArray from './generateFeatureTypeArray';
import generateRoleTypeArray from './generateRoleTypeArray';
import generateAssocTypeArray from './generateAssocTypeArray';

interface Config {
  project?: any;
  system?: any;
  numberGeneratorArray?: any;
  containerArray?: any;
  codeListArray?: any;
  codeListBindingArray?: any;
  attachmentTypeArray?: any;
  featureTypeArray?: any;
  roleTypeArray?: any;
  assocTypeArray?: any;
}

// Load configuration JSON
const config: Config = JSON.parse(fs.readFileSync('././data/config.json', 'utf-8'));

// Create XML root
const root = create().ele('ber:model', {
  'xmlns:xlink': 'http://www.w3.org/1999/xlink',
  'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
  'xmlns:se': 'http://www.opengis.net/se',
  'xmlns:ogc': 'http://www.opengis.net/ogc',
  'xmlns:sld': 'http://www.opengis.net/sld',
  'xmlns:ber': 'http://www.berit.com/ber'
});

// Add project element (example, can be moved to its own module if needed)
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

// Add system element (example, can be moved to its own module if needed)
if (config.system) {
  const system = root.ele('ber:system', { id: config.system.id });
  if (config.system.version) {
    const version = system.ele('ber:version');
    version.ele('ber:model').txt(config.system.version.model);
    version.ele('ber:minClient').txt(config.system.version.minClient);
    version.ele('ber:minAS').txt(config.system.version.minAS);
  }
}

// Generate and append XML sections using the individual scripts
generateNumberGeneratorArray(root, config);
generateContainerArray(root, config);
generateCodeListArray(root, config);
generateCodeListBindingArray(root, config);
generateAttachmentTypeArray(root, config);
generateFeatureTypeArray(root, config);
generateRoleTypeArray(root, config);
generateAssocTypeArray(root, config);

// End XML creation
const xml = root.end({ prettyPrint: true });

// Save the XML to a file
fs.writeFileSync('generate/output/model.xml', xml, 'utf-8');

console.log('model.xml has been created successfully!');