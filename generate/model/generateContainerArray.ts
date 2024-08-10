
export default function generateContainerArray(root: any, config: any) {
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
}