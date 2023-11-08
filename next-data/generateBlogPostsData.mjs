'use strict';

import { createReadStream } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { basename, extname, join } from 'node:path';
import readline from 'node:readline';

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

  return { title, author, date: new Date(date), category, slug };
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

  // Writes the Blog Posts to the JSON file
  const writeResult = blogPosts => {
    return writeFile(
      jsonFilePath,
      JSON.stringify({
        pagination: [...blogMetadata.pagination].sort(),
        categories: [...blogMetadata.categories].sort(),
        posts: blogPosts.sort((a, b) => b.date - a.date),
      })
    );
  };

  return new Promise(resolve => {
    const blogPosts = [];

    for (const filename of filenames) {
      let rawFrontmatter = '';
      let countOfSeparators = 0;

      // We create a stream for reading a file instead of reading the files
      const _stream = createReadStream(join(blogPath, filename));

      // We create a readline interface to read the file line-by-line
      const _readLine = readline.createInterface({ input: _stream });

      // We read line by line
      _readLine.on('line', line => {
        rawFrontmatter += `${line}\n`;

        // We observe the frontmatter separators
        if (line === '---') {
          countOfSeparators += 1;
        }

        // Once we have two separators we close the readLine and the stream
        if (countOfSeparators === 2) {
          _readLine.close();
          _stream.close();
        }
      });

      // Then we parse gray-matter on the frontmatter
      // This allows us to only read the frontmatter part of each file
      // and optimise the read-process as we have thousands of markdown files
      _readLine.on('close', () => {
        blogPosts.push(getFrontMatter(filename, rawFrontmatter));

        // Once we finish reading all fles
        if (blogPosts.length === filenames.length) {
          resolve(writeResult(blogPosts));
        }
      });
    }
  });
};

export default generateBlogPostsData;
