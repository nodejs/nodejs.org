// @TODO: This is a temporary hack until we migrate to the `nodejs/nodejs.dev` codebase
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { Feed } from 'feed';

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
    `---\nlayout: blog-index.hbs\ntitle: News from ${year}\npaginate: blog\n---\n`
  );

export const generateBlogYearPages = cachedBlogData =>
  cachedBlogData('', true)
    .then(({ blogData }) => blogData.posts.map(p => p.date.getFullYear()))
    .then(data => [...new Set(data)])
    .then(data => data.forEach(createBlogYearFile));

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

    const mapBlogPostToFeed = post =>
      feed.addItem({
        title: post.title,
        id: `https://nodejs.org/en${post.slug}`,
        link: `https://nodejs.org/en${post.slug}`,
        author: post.author,
        date: new Date(post.date),
      });

    cachedBlogData(blogCategoryOrAll)
      .then(({ blogData }) => blogData.posts.forEach(mapBlogPostToFeed))
      .then(() => writeFile(join(publicFeedPath, metadata.file), feed.rss2()));
  });
