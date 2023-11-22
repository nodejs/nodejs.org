import { cache } from 'react';

import generateWebsiteFeeds from '@/next-data/generators/websiteFeeds.mjs';
import provideBlogData from '@/next-data/providers/blogData';

const websiteFeeds = generateWebsiteFeeds(provideBlogData());

const provideWebsiteFeeds = cache(async (feed: string) => {
  return websiteFeeds.then(feeds => {
    if (feed.includes('.xml') && feeds.has(feed)) {
      return feeds.get(feed)?.rss2();
    }

    return undefined;
  });
});

export default provideWebsiteFeeds;
