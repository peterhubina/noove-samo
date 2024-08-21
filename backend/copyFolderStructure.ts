import * as fs from 'fs';
import * as path from 'path';

export default function createProjectConfiguration(source: string, target: string) {
    copyFolderContentsRecursiveSync(source, target);

    const schemaPath = path.join(__dirname, 'schema.json');
    const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
    // Extract parts.id values
    const partIds = schema.parts.map((part: { id: string }) => part.id);

    // Define the base directories
    const entitiesBaseDir = path.join(target, 'lids-as', 'business-service', 'entities');
    const scriptsBaseDir = path.join(target, 'lids-as', 'business-service', 'scripts');

    // Create directories in entities and scripts folders
    createDirectories(entitiesBaseDir, partIds);
    createDirectories(scriptsBaseDir, partIds);
}

function copyFileSync(source: string, target: string) {
    let targetFile = target;

    // If target is a directory, create a new file with the same name
    if (fs.existsSync(target)) {
        if (fs.lstatSync(target).isDirectory()) {
            targetFile = path.join(target, path.basename(source));
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderContentsRecursiveSync(source: string, target: string) {
    if (!fs.existsSync(target)) {
        fs.mkdirSync(target, { recursive: true });
    }

    if (fs.lstatSync(source).isDirectory()) {
        const files = fs.readdirSync(source);

        files.forEach(file => {
            const curSource = path.join(source, file);
            const curTarget = path.join(target, file);

            if (fs.lstatSync(curSource).isDirectory()) {
                copyFolderContentsRecursiveSync(curSource, curTarget);
            } else {
                copyFileSync(curSource, curTarget);
            }
        });
    }
}

function createDirectories(baseDir: string, ids: string[]) {
    if (!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir, { recursive: true });
    }

    ids.forEach(id => {
        const dirPath = path.join(baseDir, id);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
            console.log(`Directory created: ${dirPath}`);
        }
    });
}
