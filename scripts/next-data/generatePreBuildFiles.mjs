// @TODO: This is a temporary hack until we migrate to the `nodejs/nodejs.dev` codebase
import { writeFile, readFile} from 'fs/promises';
import { join } from 'path';
import { Feed } from 'feed';
import { evaluate } from '@mdx-js/mdx'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import * as runtime from 'react/jsx-runtime'
import { getRelativePath } from './_helpers.mjs';

// imports the global site config
import siteConfig from '../../site.json' assert { type: 'json' };

// this allows us to get the current module working directory
const __dirname = getRelativePath(import.meta.url);

// gets the current blog path based on local module path
const blogPath = join(__dirname, '../../pages/en/blog');

const publicFeedPath = join(__dirname, '../../public/en/feed');

// creates a markdown file for the blog year
const createBlogYearFile = year =>
  writeFile(
    join(blogPath, `year-${year}.md`),
    `---\nlayout: blog-index.hbs\npaginate: blog\n---\n`
  );

export const generateBlogYearPages = cachedBlogData =>
  cachedBlogData('', true)
    .then(({ blogData }) => blogData.posts.map(p => p.date.getFullYear()))
    .then(data => [...new Set(data)])
    .then(data => data.forEach(createBlogYearFile));

/**
 * Render markdown to html via mdx
 * @param {string} body
 * @returns {Promise<string>}
 * @see {https://github.com/mdx-js/mdx/discussions/1985}
 */
export const renderMarkdown = async body => {
  const { default: mdx } = await evaluate(body, {
    ...runtime,
    format: "md",
    development: false,
    // format: 'md' — treat file as plain vanilla markdown
    // Need to add the following remark plugins to support GFM and frontmatter
    // https://github.com/remarkjs/remark-gfm
    // https://github.com/remarkjs/remark-frontmatter
    remarkPlugins: [remarkGfm, remarkFrontmatter],
  })
  return renderToString(createElement(mdx))
}
export const generateWebsiteFeeds = cachedBlogData =>
  siteConfig.rssFeeds.forEach(metadata => {
    const feed = new Feed({
      title: metadata.title,
      description: metadata.description || siteConfig.description,
      id: metadata.link,
      link: metadata.link,
      language: 'en',
    });

    const blogCategoryOrAll = metadata.blogCategory
      ? `/en/blog/${metadata.blogCategory}`
      : '/en/blog';

    const mapBlogPostToFeed = async post => {
      const markdownContent = await readFile(join(blogPath, post.category, post.file), 'utf8');
      const htmlContent = await renderMarkdown(markdownContent)
      return {
        title: post.title,
        content: htmlContent,
        id: `https://nodejs.org/en${post.slug}`,
        link: `https://nodejs.org/en${post.slug}`,
        author: post.author,
        date: new Date(post.date),
      };
    };

    cachedBlogData(blogCategoryOrAll)
      .then(({ blogData }) => Promise.all(blogData.posts.map(mapBlogPostToFeed)))
      .then((feedItems) => feedItems.forEach(feedItem => feed.addItem(feedItem)))
      .then(() => writeFile(join(publicFeedPath, metadata.file), feed.rss2()));
  });
