import { Feed } from 'feed';
import type { Feed as FeedType } from 'feed';

import { BASE_URL, BASE_PATH } from '@/next.constants.mjs';
import { siteConfig } from '@/next.json.mjs';
import type { BlogPostsRSC } from '@/types';

// This is the Base URL for the Node.js Website
// with English locale (which is where the website feeds run)
const canonicalUrl = `${BASE_URL}${BASE_PATH}/en`;

/**
 * This method generates RSS website feeds based on the current website configuration
 * and the current blog data that is available
 */
const generateWebsiteFeeds = ({ posts }: BlogPostsRSC) => {
  /**
   * This generates all the Website RSS Feeds that are used for the website
   */
  const websiteFeeds: Array<[string, FeedType]> = siteConfig.rssFeeds.map(
    ({ category, title, description, file }) => {
      const feed = new Feed({
        id: file,
        title: title,
        language: 'en',
        link: `${canonicalUrl}/feed/${file}`,
        description: description,
        copyright: '© OpenJS Foundation',
      });

      const blogFeedEntries = posts
        .filter(post => post.categories.includes(category))
        .map(post => ({
          id: post.slug,
          title: post.title,
          // @TODO: use righ object type for date
          // wait https://github.com/nodejs/nodejs.org/pull/7143 to be merged
          author: post.author,
          date: new Date(post.date),
          link: `${canonicalUrl}${post.slug}`,
        }));

      // @ts-expect-error - The addItem need a valide Item type
      blogFeedEntries.forEach(entry => feed.addItem(entry));

      return [file, feed];
    }
  );

  return new Map<string, FeedType>(websiteFeeds);
};

export default generateWebsiteFeeds;
