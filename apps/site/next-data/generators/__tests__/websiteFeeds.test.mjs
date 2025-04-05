import assert from 'node:assert';
import { describe, it } from 'node:test';

import generateWebsiteFeeds from '@/next-data/generators/websiteFeeds.mjs';

import { BASE_URL, BASE_PATH } from '../../../next.constants.mjs';
import { siteConfig } from '../../../next.json.mjs';

const base = `${BASE_URL}${BASE_PATH}/en`;

describe('generateWebsiteFeeds', () => {
  it('generates website feeds with correct data', () => {
    const blogData = {
      posts: [
        {
          slug: '/post-1',
          title: 'Post 1',
          author: 'Author 1',
          date: '2024-02-18',
          categories: ['all'],
        },
      ],
    };

    const result = generateWebsiteFeeds(blogData);
    assert.strictEqual(result.size, 3);

    const blogFeed = result.get('blog.xml');
    assert.deepStrictEqual(blogFeed.options, {
      id: siteConfig.rssFeeds[0].file,
      title: siteConfig.rssFeeds[0].title,
      language: 'en',
      link: `${base}/feed/${siteConfig.rssFeeds[0].file}`,
      description: siteConfig.rssFeeds[0].description,
    });

    assert.deepStrictEqual(blogFeed.items, [
      {
        author: blogData.posts[0].author,
        id: blogData.posts[0].slug,
        title: blogData.posts[0].title,
        date: new Date(blogData.posts[0].date),
        link: `${base}${blogData.posts[0].slug}`,
      },
    ]);
  });
});
