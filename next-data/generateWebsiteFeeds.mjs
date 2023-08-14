'use strict';

import { Feed } from 'feed';
import { siteConfig } from '../next.json.mjs';
import { BASE_URL, BASE_PATH } from '../next.constants.mjs';

/**
 * This method generates RSS website feeds based on the current website configuration
 * and the current blog data that is available
 *
 * @param {import('../types').BlogData} blogData
 */
const generateWebsiteFeeds = ({ posts }) => {
  const canonicalUrl = `${BASE_URL}${BASE_PATH}/en`;

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
        description: description || siteConfig.description,
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
};

export default generateWebsiteFeeds;
