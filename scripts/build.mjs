import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { asyncExec } from './utils.mjs';
import { context } from './context.mjs';

const packages = readdirSync(context.__packagesDir);

const results = await Promise.allSettled(
  packages.map(async (pkg) => {
    const path = join(context.__packagesDir, pkg);
    const { stderr } = await asyncExec(`cd ${path} && yarn run build`);
    if (stderr) {
      console.log(`${pkg}: ${stderr}`);
    }
    return `${pkg} built`;
  }),
);

results.forEach((result) => {
  if (result.reason) {
    console.error(result.reason);
    return;
  }
  console.log(result.value);
});
