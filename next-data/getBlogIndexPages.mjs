'use strict';

/**
 * This method gets all available blog posts and generates an index of
 * all years that have blog posts. This approach uses the file system
 * for checking all available posts.
 *
 * @param {ReturnType<import('./getBlogData.mjs').default>} cachedBlogData
 * @return {Promise<string[]>} the list of years that have blog posts
 */
const getBlogIndexPages = cachedBlogData =>
  cachedBlogData('', true)
    .then(({ blogData }) => blogData.posts.map(p => p.date.getFullYear()))
    .then(data => data.map(year => year.toString()))
    .then(data => [...new Set(data)]);

export default getBlogIndexPages;
