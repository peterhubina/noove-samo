import fs from 'fs';
import { dirname, resolve } from 'path';



export function file(contents: any) {
  return (path: string) => {
    fs.mkdirSync(dirname(path), { recursive: true });
    fs.writeFileSync(path, JSON.stringify(contents, null, 2));
  };
}

export function generate(path: string, structure: any) {
  fs.rmSync(path, { recursive: true, force: true });

  for (const [directory, value] of Object.entries(structure)) {
    if (typeof value === 'function') {
      value(resolve(path, directory));
    } else {
      generate(resolve(path, directory), value);
    }
  }
}

