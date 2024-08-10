
export default function generateCodeListArray(root: any, config: any) {
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
}