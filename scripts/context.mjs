import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const __rootDir = dirname(__dirname);

export const context = {
  __rootDir,
  __packagesDir: join(__rootDir, 'packages'),
  __packageName: 'package.json',
};
Object.freeze(context);
