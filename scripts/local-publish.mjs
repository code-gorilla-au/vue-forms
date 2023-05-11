#!/usr/bin/env node

import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { asyncExec } from './utils.mjs';
import { context } from './context.mjs';

const packages = readdirSync(context.__packagesDir);

const results = await Promise.allSettled(
  packages.map(async (pkg) => {
    const path = join(context.__packagesDir, pkg);
    const { stdout, stderr } = await asyncExec(
      `cd ${path} && yarn run publishLocal`,
    );
    if (stderr) {
      console.log(`${pkg}: ${stderr}`);
    }
    if (stdout) {
      console.log(`${pkg}: ${stdout}`);
    }
    return `${pkg} published`;
  }),
);

results.forEach((result) => {
  if (result.reason) {
    console.error(result.reason);
    return;
  }
  console.log(result.value);
});
