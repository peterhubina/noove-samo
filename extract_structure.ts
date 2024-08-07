import * as fs from 'fs';
import * as path from 'path';

function generateFolderStructureDict(rootDir: string): { [key: string]: any } {
    const folderStructure: { [key: string]: any } = {};

    function recurse(currentPath: string, currentLevel: { [key: string]: any }) {
        const items = fs.readdirSync(currentPath);
        items.forEach(item => {
            const itemPath = path.join(currentPath, item);
            const stats = fs.statSync(itemPath);
            if (stats.isDirectory()) {
                currentLevel[item] = {};
                recurse(itemPath, currentLevel[item]);
            } else {
                if (!Array.isArray(currentLevel.files)) {
                    currentLevel.files = [];
                }
                currentLevel.files.push(item);
            }
        });
    }

    recurse(rootDir, folderStructure);
    return folderStructure;
}

const rootDir = '/Users/peter_hubina/Desktop/noove challenge/Example Project/environments/samo-training/configuration/packages/samo_samo-training'; // Replace with your actual project root directory

const folderStructure = generateFolderStructureDict(rootDir);

const jsonFilePath = path.join(__dirname, 'folder_structure.json');

fs.writeFileSync(jsonFilePath, JSON.stringify(folderStructure, null, 4));

console.log(`Folder structure saved to ${jsonFilePath}`);
