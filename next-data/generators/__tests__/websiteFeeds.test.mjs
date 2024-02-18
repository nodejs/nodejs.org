import generateWebsiteFeeds from '@/next-data/generators/websiteFeeds';

describe('generateWebsiteFeeds', () => {
  jest.mock('feed');
  jest.mock('../../../next.constants.mjs', () => ({
    BASE_URL: 'https://example.com',
    BASE_PATH: '/example',
  }));
  jest.mock('../../../next.json.mjs', () => ({
    siteConfig: {
      rssFeeds: [
        {
          category: 'all',
          title: 'Node.js Blog',
          description: 'Node.js Blog Feed',
          file: 'blog.xml',
        },
      ],
    },
  }));

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
    expect(result.size).toBe(3);

    const blogFeed = result.get('blog.xml');

    expect(blogFeed.options.id).toBe('blog.xml');
    expect(blogFeed.options.title).toBe('Node.js Blog');
    expect(blogFeed.options.language).toBe('en');
    expect(blogFeed.options.link).toBe('https://nodejs.org/en/feed/blog.xml');

    expect(blogFeed.items.length).toBe(1);
    const feedItem = blogFeed.items[0];
    expect(feedItem.id).toBe('/post-1');
    expect(feedItem.title).toBe('Post 1');
    expect(feedItem.author).toBe('Author 1');
    expect(feedItem.date).toEqual(new Date('2024-02-18'));
    expect(feedItem.link).toBe('https://nodejs.org/en/post-1');
  });
});
