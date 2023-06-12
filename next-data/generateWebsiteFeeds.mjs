'use strict';

import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { Feed } from 'feed';
import * as helpers from './helpers.mjs';

// imports the global site config
import siteConfig from '../site.json' assert { type: 'json' };

// this allows us to get the current module working directory
const __dirname = helpers.getRelativePath(import.meta.url);

// gets the current blog path based on local module path
const blogPath = join(__dirname, '../pages/en/blog');

const publicFeedPath = join(__dirname, '../public/en/feed');

/**
 * This method generates RSS website feeds based on the current website configuration
 * and the current blog data that is available
 *
 * @param {ReturnType<import('./getBlogData.mjs').default>} cachedBlogData
 */
const generateWebsiteFeeds = cachedBlogData =>
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

    cachedBlogData(blogCategoryOrAll, !metadata.blogCategory)
      .then(({ blogData }) => blogData.posts.forEach(mapBlogPostToFeed))
      .then(() => writeFile(join(publicFeedPath, metadata.file), feed.rss2()));
  });

export default generateWebsiteFeeds;
