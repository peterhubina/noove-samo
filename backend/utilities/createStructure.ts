// @ts-ignore
import fs from 'fs';
// @ts-ignore
import path from 'path';

type FolderStructure = {
    [key: string]: FolderStructure | string[];
};

const folderStructurePath = path.join(__dirname, 'folder_structure.json');
const folderStructure: FolderStructure = JSON.parse(fs.readFileSync(folderStructurePath, 'utf-8'));

function createStructure(basePath: string, structure: FolderStructure): void {
    for (const folder in structure) {
        const folderPath = path.join(basePath, folder);
        fs.mkdirSync(folderPath, { recursive: true });

        const contents = structure[folder];
        if (Array.isArray(contents)) {
            
            contents.forEach(file => {
                const filePath = path.join(folderPath, file);
                fs.writeFileSync(filePath, file.endsWith('.xml') ? '<root>\n</root>' : '{}');
            });
        } else if (typeof contents === 'object') {
            
            createStructure(folderPath, contents);
        }
    }
}

function getNextFolderName(basePath: string): string {
    const existingFolders = fs.readdirSync(basePath).filter(folder => fs.statSync(path.join(basePath, folder)).isDirectory());
    const existingNumbers = existingFolders
        .map(folder => folder.match(/^configuration-(\d+)$/))
        .filter(match => match !== null)
        .map(match => parseInt(match![1], 10));
    const nextNumber = Math.max(0, ...existingNumbers) + 1;
    return `configuration-${String(nextNumber).padStart(2, '0')}`;
}

const basePath = 'configurations';
const newFolderName = getNextFolderName(basePath);
const newFolderPath = path.join(basePath, newFolderName);

createStructure(newFolderPath, folderStructure);

console.log(`Project structure saved to ${newFolderPath}`);
