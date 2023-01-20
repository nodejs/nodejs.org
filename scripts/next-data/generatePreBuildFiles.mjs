// @TODO: This is a temporary hack until we migrate to the `nodejs/nodejs.dev` codebase
import { writeFile } from 'fs/promises';
import { join } from 'path';

import { getRelativePath } from './_helpers.mjs';

// this allows us to get the current module working directory
const __dirname = getRelativePath(import.meta.url);

// gets the current blog path based on local module path
const blogPath = join(__dirname, '../../pages/en/blog');

// creates a markdown file for the blog year
const createBlogYearFile = year =>
  writeFile(
    join(blogPath, `year-${year}.md`),
    `---\nlayout: blog-index.hbs\npaginate: blog\n---\n`
  );

export const generateBlogYearPages = cachedBlogData =>
  cachedBlogData('', true)
    .then(data => data.posts.map(p => p.date.getFullYear()))
    .then(data => [...new Set(data)])
    .then(data => data.forEach(createBlogYearFile));
