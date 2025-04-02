import { writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import generateBlogData from '../../next-data/generators/blogData.mjs';

const blogData = await generateBlogData();

const __dirname = dirname(fileURLToPath(import.meta.url));
writeFileSync(
  `${__dirname}/../../public/blog-data.json`,
  JSON.stringify(blogData),
  'utf8'
);
