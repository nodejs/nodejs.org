'use strict';

import { mkdirSync, writeFileSync } from 'node:fs';

import generateTwoslashFsMap from './generate.mjs';

const fsMap = generateTwoslashFsMap();

const outputPath = new URL(
  '../../generated/twoslash-fsmap.json',
  import.meta.url
);

mkdirSync(new URL('.', outputPath), { recursive: true });
writeFileSync(outputPath, JSON.stringify(fsMap), 'utf8');
