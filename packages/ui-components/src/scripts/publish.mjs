import { spawnSync } from 'node:child_process';
import { writeFile } from 'node:fs/promises';

import pkg from '../package.json' with { type: 'json' };

// Strip the devDependencies, since they aren't needed for publish
// Strip the exports, since we don't want to reference './src'
/* eslint-disable @typescript-eslint/no-unused-vars */
const { devDependencies, exports, ...cleanedPkg } = pkg;
// Change `#ui` to `./` from `./src`, since we are publishing
// from the same directory as the source code (rather, the compiled code).
cleanedPkg.imports['#ui/*'] = ['./*'];

await writeFile(
  'dist/package.json',
  JSON.stringify(cleanedPkg, null, 2),
  'utf8'
);
spawnSync('pnpm', ['publish'], { cwd: 'dist', stdio: 'inherit' });
