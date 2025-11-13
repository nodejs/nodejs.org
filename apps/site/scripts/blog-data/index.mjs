import { writeFileSync } from 'node:fs';

import generateBlogData from './generate.mjs';

const blogData = await generateBlogData();

writeFileSync(
  new URL(`../../public/blog-data.json`, import.meta.url),
  JSON.stringify(blogData),
  'utf8'
);
