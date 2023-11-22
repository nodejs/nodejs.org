'use strict';

import generateBlogPostsData from './next-data/generateBlogPostsData.mjs';
import generateNodeReleasesJson from './next-data/generateNodeReleasesJson.mjs';
import generateWebsiteFeeds from './next-data/generateWebsiteFeeds.mjs';

/** @type {import('./types').BlogData} */
export const blogData = await generateBlogPostsData();

/** @type {import('./types').NodeRelease[]} */
export const releaseData = await generateNodeReleasesJson();

/** @type {Map<string, import('feed').Feed} */
export const websiteFeeds = await generateWebsiteFeeds(blogData);
