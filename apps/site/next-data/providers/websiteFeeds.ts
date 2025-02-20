import { cache } from 'react';

import generateWebsiteFeeds from '@/next-data/generators/websiteFeeds.mjs';
import { provideBlogPosts } from '@/next-data/providers/blogData';

const getWebsiteFeeds = cache(async () =>
  generateWebsiteFeeds(await provideBlogPosts('all'))
);

const provideWebsiteFeeds = cache(async (feed: string) => {
  const websiteFeeds = await getWebsiteFeeds();

  if (feed.includes('.xml') && websiteFeeds.has(feed)) {
    return websiteFeeds.get(feed)!.rss2();
  }

  return undefined;
});

export default provideWebsiteFeeds;
