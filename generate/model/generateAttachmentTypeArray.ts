
export default function generateAttachmentTypeArray(root: any, config: any) {
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
}