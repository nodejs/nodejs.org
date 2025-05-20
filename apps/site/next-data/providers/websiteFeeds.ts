import { cache } from 'react';

import generateWebsiteFeeds from '#site/next-data/generators/websiteFeeds.mjs';
import { provideBlogPosts } from '#site/next-data/providers/blogData';

const websiteFeeds = generateWebsiteFeeds(provideBlogPosts('all'));

const provideWebsiteFeeds = cache((feed: string) => {
  if (feed.includes('.xml') && websiteFeeds.has(feed)) {
    return websiteFeeds.get(feed)!.rss2();
  }

  return undefined;
});

export default provideWebsiteFeeds;
