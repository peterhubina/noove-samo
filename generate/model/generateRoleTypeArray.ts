
export default function generateRoleTypeArray(root: any, config: any) {
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
}