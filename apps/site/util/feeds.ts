'use strict';

import { Feed } from 'feed';

import { BASE_URL, BASE_PATH } from '#site/next.constants.mjs';
import { siteConfig } from '#site/next.json.mjs';

import type { BlogPostsRSC } from '#site/types';
import type { FeedOptions } from 'feed';

import { getBlogPosts } from './blog';

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
 */
export const generateWebsiteFeeds = ({ posts }: BlogPostsRSC) => {
  /**
   * This generates all the Website RSS Feeds that are used for the website
   */
  const websiteFeeds: Array<[string, Feed]> = siteConfig.rssFeeds.map(
    ({ category, title, description, file }) => {
      const feed = new Feed({
        id: file,
        title,
        language: 'en',
        link: canonicalUrl,
        description: description || '',
      } as FeedOptions);

      const blogFeedEntries = posts
        .filter(post => post.categories.includes(category))
        .map(post => {
          const date = new Date(post.date);
          const time = date.getTime();

          return {
            title: post.title,
            date,
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

export const getFeeds = (feed: string) => {
  const blogPosts = getBlogPosts('all');
  const websiteFeeds = generateWebsiteFeeds(blogPosts);

  if (feed.includes('.xml') && websiteFeeds.has(feed)) {
    return websiteFeeds.get(feed)!.rss2();
  }

  return undefined;
};
