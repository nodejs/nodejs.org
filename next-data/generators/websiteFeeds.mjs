'use strict';

import { Feed } from 'feed';

import { BASE_URL, BASE_PATH } from '../../next.constants.mjs';
import { siteConfig } from '../../next.json.mjs';

// This is the Base URL for the Node.js Website
// with English locale (which is where the website feeds run)
const canonicalUrl = `${BASE_URL}${BASE_PATH}/en`;

/**
 * This method generates RSS website feeds based on the current website configuration
 * and the current blog data that is available
 *
 * @param {Promise<import('../../types').BlogDataRSC>} blogData
 */
const generateWebsiteFeeds = blogData => {
  return blogData.then(({ posts }) => {
    /**
     * This generates all the Website RSS Feeds that are used for the website
     *
     * @type {[string, Feed][]}
     */
    const websiteFeeds = siteConfig.rssFeeds.map(
      ({ category, title, description, file }) => {
        const feed = new Feed({
          id: file,
          title: title,
          language: 'en',
          link: `${canonicalUrl}/feed/${file}`,
          description: description || description,
        });

        const blogFeedEntries = posts
          .filter(post => !category || post.category === category)
          .map(post => ({
            id: post.slug,
            title: post.title,
            author: post.author,
            date: new Date(post.date),
            link: `${canonicalUrl}${post.slug}`,
          }));

        blogFeedEntries.forEach(entry => feed.addItem(entry));

        return [file, feed];
      }
    );

    return new Map(websiteFeeds);
  });
};

export default generateWebsiteFeeds;
