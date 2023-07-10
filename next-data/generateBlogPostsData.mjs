'use strict';

import { readFile, writeFile } from 'node:fs/promises';
import { basename, extname, join } from 'node:path';
import graymatter from 'gray-matter';
import * as nextHelpers from '../next.helpers.mjs';

// gets the current blog path based on local module path
const blogPath = join(process.cwd(), 'pages/en/blog');

// this is the destination path for where the JSON file will be written
const jsonFilePath = join(process.cwd(), 'public/blog-posts-data.json');

/**
 * This contains the metadata of all available blog categories and
 * available pagination entries (years)
 *
 * @type {{ pagination: Set<number>; categories: Set<string>}}
 */
const blogMetadata = { pagination: new Set(), categories: new Set() };

/**
 * This method parses the source (raw) Markdown content into Frontmatter
 * and returns basic information for blog posts
 *
 * @param {string} filename the filename related to the blogpost
 * @param {string} source the source markdown content of the blog post
 */
const getFrontMatter = (filename, source) => {
  const {
    title = 'Untitled',
    author = 'The Node.js Project',
    date = new Date(),
    category = 'uncategorized',
  } = graymatter(source).data;

  // we add the year to the pagination set
  blogMetadata.pagination.add(new Date(date).getUTCFullYear());

  // we add the category to the categories set
  blogMetadata.categories.add(category);

  // this is the url used for the blog post it based on the category and filename
  const slug = `/blog/${category}/${basename(filename, extname(filename))}`;

  return { title, author, date, category, slug };
};

/**
 * This method is used to generate the JSON file
 */
const generateBlogPostsData = async () => {
  // we retrieve all the filenames of all blog posts
  const filenames = await nextHelpers.getMarkdownFiles(
    process.cwd(),
    'pages/en/blog',
    ['**/index.md', '**/pagination.md']
  );

  // we gather all the information of all the blog posts by reading each individual file
  // and then parsing the frontmatter and source content and returning a minified object
  const postsPromise = filenames
    .map(name => ({ name, file: readFile(join(blogPath, name)) }))
    .map(({ name, file }) => file.then(source => getFrontMatter(name, source)));

  // we await for all the work to be concluded and return a nice blog posts object
  const posts = await Promise.all(postsPromise);

  return writeFile(
    jsonFilePath,
    JSON.stringify({
      pagination: [...blogMetadata.pagination].sort(),
      categories: [...blogMetadata.categories].sort(),
      posts: posts.sort((a, b) => b.date - a.date),
    })
  );
};

export default generateBlogPostsData;
