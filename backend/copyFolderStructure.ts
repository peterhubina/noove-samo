import * as fs from 'fs';
import * as path from 'path';

export default function createProjectConfiguration(source: string, target: string) {
    copyFolderContentsRecursiveSync(source, target);

    const schemaPath = path.join(__dirname, 'entities.json');
    const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));

    // Extract part ids and actions
    const entities = schema.entities.map((entity: { name: string, actions: { title: string }[] }) => ({
        name: entity.name,
        actions: entity.actions.map(action => action.title)
    }));

    // Define the base directories
    const entitiesBaseDir = path.join(target, 'lids-as', 'business-service', 'entities');
    const scriptsBaseDir = path.join(target, 'lids-as', 'business-service', 'scripts');

    // Create directories and files in entities and scripts folders
    createDirectoriesAndFiles(entitiesBaseDir, scriptsBaseDir, entities);
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

function createDirectoriesAndFiles(entitiesBaseDir: string, scriptsBaseDir: string, entities: { name: string, actions: string[] }[]) {
    entities.forEach(entity => {
        const entityDir = path.join(entitiesBaseDir, `ap_${entity.name}`);
        const scriptDir = path.join(scriptsBaseDir, `ap_${entity.name}`);

        // Create entity directories if they don't exist
        if (!fs.existsSync(entityDir)) {
            fs.mkdirSync(entityDir, { recursive: true });
            console.log(`Directory created: ${entityDir}`);
        }

        if (!fs.existsSync(scriptDir)) {
            fs.mkdirSync(scriptDir, { recursive: true });
            console.log(`Directory created: ${scriptDir}`);
        }

        // Create empty .json files for each action in the script folder
        entity.actions.forEach(action => {
            const filePath = path.join(scriptDir, `${action}.json`);
            if (!fs.existsSync(filePath)) {
                fs.writeFileSync(filePath, '{}');
                console.log(`File created: ${filePath}`);
            }
        });
    });
}
