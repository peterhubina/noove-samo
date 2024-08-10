
export default function generateFeatureTypeArray(root: any, config: any) {
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
}