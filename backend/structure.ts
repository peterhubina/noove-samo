import fs from 'fs';
import { dirname, resolve } from 'path';



export function jsonFile(contents: any) {
  return (path: string, overwrite = false) => {
    fs.mkdirSync(dirname(path), { recursive: true });
    if (!overwrite && fs.existsSync(path)) return;
    fs.writeFileSync(path, JSON.stringify(contents, null, 2));
  };
}

export function stringFile(contents: string) {
  return (path: string, overwrite = false) => {
    fs.mkdirSync(dirname(path), { recursive: true });
    if (!overwrite && fs.existsSync(path)) return;
    fs.writeFileSync(path, contents);
  };
}


export function bufferFile(contents: Buffer) {
  return (path: string, overwrite = false) => {
    fs.mkdirSync(dirname(path), { recursive: true });
    if (!overwrite && fs.existsSync(path)) return;
    fs.writeFileSync(path, contents as any);
  };
}

export function overwrite(contents: any = {}) {
  return (path: string) => generate(path, contents, true);
}

export function keep(contents: any = {}) {
  return (path: string) => generate(path, contents);
}

export function generate(path: string, structure: any, overwrite = false) {
  if (overwrite && fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
    const directoryContents = fs.readdirSync(path);
    directoryContents.filter(file => !structure[file])
      .forEach(file => fs.rmSync(resolve(path, file), { recursive: true, force: true }));
  }


  for (const [directory, value] of Object.entries(structure)) {
    if (typeof value === 'function') {
      value(resolve(path, directory), overwrite);
    } else {
      generate(resolve(path, directory), value, overwrite);
    }
  }
}