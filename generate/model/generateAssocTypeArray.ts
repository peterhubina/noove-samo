
export default function generateAssocTypeArray(root: any, config: any) {
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
}