import { readdirSync } from 'node:fs';
import { exec } from 'node:child_process';
import { join } from 'node:path';
import { context } from './context.mjs';

const packages = readdirSync(context.__packagesDir);

packages.forEach((dir) => {
  const path = join(context.__packagesDir, dir);
  const result = exec(`cd ${path} && npm run`);
});
console.log(packages);
