import { writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { watch } from 'chokidar';

import generateBlogData from '../../next-data/generators/blogData.mjs';

await generateAndSaveBlogData();

const watchMode =
  process.argv.includes('--watch') || process.argv.includes('-w');

if (watchMode) {
  watch('pages/en', { ignoreInitial: true }).on('all', generateAndSaveBlogData);
}

async function generateAndSaveBlogData() {
  const blogData = await generateBlogData();

  const __dirname = dirname(fileURLToPath(import.meta.url));
  writeFileSync(
    `${__dirname}/../../public/blog-data.json`,
    JSON.stringify(blogData),
    'utf8'
  );
}
