import * as fs from 'fs';
import * as path from 'path';

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

export default function copyFolderContentsRecursiveSync(source: string, target: string) {
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
