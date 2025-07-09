'use strict';

import { Feed } from 'feed';

import { BASE_URL, BASE_PATH } from '../../next.constants.mjs';
import { siteConfig } from '../../next.json.mjs';

// This is the Base URL for the Node.js Website
// with English locale (which is where the website feeds run)
const canonicalUrl = `${BASE_URL}${BASE_PATH}/en`;

// This is April 16th, 2025, which is around the time that https://github.com/nodejs/nodejs.org/pull/7648
// was merged. This ensures that future article edits are properly timestamped, while also preventing the
// currently-published article GUIDs from changing
const guidTimestampStartDate = 1744761600000;

/**
 * This method generates RSS website feeds based on the current website configuration
 * and the current blog data that is available
 *
 * @param {import('../../types').BlogPostsRSC} blogData
 */
const generateWebsiteFeeds = ({ posts }) => {
  /**
   * This generates all the Website RSS Feeds that are used for the website
   *
   * @type {Array<[string, Feed]>}
   */
  const websiteFeeds = siteConfig.rssFeeds.map(
    ({ category, title, description, file }) => {
      const feed = new Feed({
        id: file,
        title: title,
        language: 'en',
        link: `${canonicalUrl}/feed/${file}`,
        description: description,
      });

      const blogFeedEntries = posts
        .filter(post => post.categories.includes(category))
        .map(post => {
          const date = new Date(post.date);
          const time = date.getTime();

          return {
            id: post.slug,
            title: post.title,
            author: post.author,
            date: date,
            link: `${canonicalUrl}${post.slug}`,
            guid:
              time > guidTimestampStartDate
                ? `${post.slug}?${date.getTime()}`
                : post.slug,
          };
        });

      blogFeedEntries.forEach(entry => feed.addItem(entry));

      return [file, feed];
    }
  );

  return new Map(websiteFeeds);
};

export default generateWebsiteFeeds;
