
export default function generateNumberGeneratorArray(root: any, config: any) {
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
}