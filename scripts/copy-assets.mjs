import { cp, mkdir, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import { fileURLToPath } from 'node:url';

const source = fileURLToPath(new URL('../assessments/', import.meta.url));
const target = fileURLToPath(new URL('../dist/assessments/', import.meta.url));

try {
    await access(target, constants.F_OK);
} catch {
    await mkdir(target, { recursive: true });
}

await cp(source, target, { recursive: true });
console.log(`copied assessments -> ${target}`);
