'use strict';

import { createReadStream } from 'node:fs';
import { basename, extname, join } from 'node:path';
import readline from 'node:readline';

import graymatter from 'gray-matter';

import { getMarkdownFiles } from '#site/next.helpers.mjs';

// gets the current blog path based on local module path
const blogPath = join(process.cwd(), 'pages/en/blog');

const escapeRegExp = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getMarkupBlockTag = line => {
  const match = /^<([A-Za-z][\w.-]*)(?:\s|>|\/>|$)/.exec(line);

  if (!match) {
    return undefined;
  }

  const tag = match[1];
  const closingTag = new RegExp(`</${escapeRegExp(tag)}>\\s*$`);

  return {
    tag,
    isClosed: /\/>\s*$/.test(line) || closingTag.test(line),
  };
};

const isNonParagraphLine = line =>
  line.startsWith('#') ||
  line.startsWith('![') ||
  line.startsWith('```') ||
  line.startsWith('~~~') ||
  line.startsWith('---') ||
  line.startsWith('</') ||
  /^\[[^\]]+\]:/.test(line) ||
  /^<!--.*-->$/.test(line);

const listItemMarker = /^\s*([-*]|\d+\.)\s+/;

const stripMarkdownMarkup = paragraph =>
  paragraph
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\[[^\]]*\]/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/\\([[\]_*`])/g, '$1')
    .replace(/^\[[a-f0-9]{7,12}\]\s+-\s+/i, '')
    .replace(/<\/?[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const isCategoryOnlyListItem = item => {
  const strippedItem = stripMarkdownMarkup(item);

  return (
    /^(\*\*[^*]+\*\*|`[^`]+`):?$/.test(item) ||
    /^[\w ./-]+:$/.test(strippedItem)
  );
};

/**
 * This method parses the source (raw) Markdown content into Frontmatter
 * and returns basic information for blog posts
 *
 * @param {string} filename the filename related to the blogpost
 * @param {string} source the source markdown content of the blog post
 * @param {string} paragraph the first paragraph of the blog post
 */
const getFrontMatter = (filename, source, paragraph) => {
  const {
    title = 'Untitled',
    author = 'The Node.js Project',
    username,
    date = new Date(),
    category = 'uncategorized',
  } = graymatter(source).data;

  // We also use publishing years as categories for the blog
  const publishYear = new Date(date).getUTCFullYear();

  // Provides a full list of categories for the Blog Post which consists of
  // all = (all blog posts), publish year and the actual blog category
  const categories = [category, `year-${publishYear}`, 'all'];

  // this is the url used for the blog post it based on the category and filename
  const slug = `/blog/${category}/${basename(filename, extname(filename))}`;

  return {
    title,
    author,
    username,
    date: new Date(date),
    description: stripMarkdownMarkup(paragraph) || undefined,
    categories,
    slug,
  };
};

/**
 * This method is used to generate the Node.js Website Blog Data
 * for self-consumption during RSC and Static Builds
 *
 * @return {Promise<import('../../types').BlogData>}
 */
const generateBlogData = async () => {
  // We retrieve the full pathnames of all Blog Posts to read each file individually
  const filenames = await getMarkdownFiles(process.cwd(), 'pages/en/blog', [
    '**/index.md',
  ]);

  /**
   * This contains the metadata of all available blog categories
   */
  const blogCategories = new Set(['all']);

  const posts = await Promise.all(
    filenames.map(
      filename =>
        new Promise(resolve => {
          // We create a stream for reading a file instead of reading the files
          const _stream = createReadStream(join(blogPath, filename));

          // We create a readline interface to read the file line-by-line
          const _readLine = readline.createInterface({ input: _stream });

          let rawFrontmatter = '';
          let frontmatterSeparatorsEncountered = 0;
          let ignoredMarkupTag;
          const paragraphLines = [];

          // We read line by line
          _readLine.on('line', line => {
            // We observe the frontmatter separators
            if (frontmatterSeparatorsEncountered < 2) {
              rawFrontmatter += `${line}\n`;

              if (line === '---') {
                frontmatterSeparatorsEncountered++;
              }

              return;
            }

            const trimmedLine = line.trim();

            if (ignoredMarkupTag) {
              const closingTag = new RegExp(
                `</${escapeRegExp(ignoredMarkupTag)}>\\s*$`
              );

              if (closingTag.test(trimmedLine)) {
                ignoredMarkupTag = undefined;
              }

              return;
            }

            if (!trimmedLine) {
              if (paragraphLines.length > 0) {
                _readLine.close();
                _stream.close();
              }

              return;
            }

            const markupBlockTag = getMarkupBlockTag(trimmedLine);

            if (markupBlockTag) {
              if (!markupBlockTag.isClosed) {
                ignoredMarkupTag = markupBlockTag.tag;
              }

              return;
            }

            if (listItemMarker.test(line)) {
              if (paragraphLines.length === 0) {
                const listItem = line.replace(listItemMarker, '').trim();

                if (isCategoryOnlyListItem(listItem)) {
                  return;
                }

                paragraphLines.push(listItem);
              }

              _readLine.close();
              _stream.close();

              return;
            }

            if (isNonParagraphLine(trimmedLine)) {
              if (paragraphLines.length > 0) {
                _readLine.close();
                _stream.close();
              }

              return;
            }

            paragraphLines.push(trimmedLine);
          });

          // Then we parse gray-matter on the frontmatter
          // This allows us to read only the frontmatter and the first useful
          // preview line instead of loading every blog post in full.
          _readLine.on('close', () => {
            const frontMatterData = getFrontMatter(
              filename,
              rawFrontmatter,
              paragraphLines.join(' ')
            );

            frontMatterData.categories.forEach(category => {
              // we add the category to the categories set
              blogCategories.add(category);
            });

            resolve(frontMatterData);
          });
        })
    )
  );

  return {
    categories: [...blogCategories],
    posts: posts.sort((a, b) => b.date.getTime() - a.date.getTime()),
  };
};

export default generateBlogData;
