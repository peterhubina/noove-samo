
export default function generateCodeListBindingArray(root: any, config: any) {
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
}