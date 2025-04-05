import { normalize } from 'node:path';
import { Readable } from 'node:stream';

import generateBlogData from '@/next-data/generators/blogData.mjs';

let files = [];

jest.mock('node:fs', () => ({
  createReadStream: jest.fn(filename => {
    const readable = new Readable();
    const file = files.find(f => filename.endsWith(normalize(f.path)));
    readable.push(`---\n`);
    file.frontMatterContent.forEach(line => readable.push(`${line}\n`));
    readable.push(`---\n`);
    readable.push(null);
    readable.close = () => {};
    return readable;
  }),
}));

jest.mock('../../../next.helpers.mjs', () => ({
  getMarkdownFiles: () => Promise.resolve(files.map(file => file.path)),
}));

describe('generateBlogData', () => {
  it('should return zero posts and only the default "all" category is no md file is found', async () => {
    files = [];

    const blogData = await generateBlogData();

    expect(blogData.categories).toStrictEqual(['all']);
    expect(blogData.posts).toStrictEqual([]);
  });

  it('should collect the data from a single md file if only one is found', async () => {
    files = [
      {
        path: 'pages/en/blog/post1.md',
        frontMatterContent: [
          `date: '2020-01-01T00:00:00.000Z'`,
          `title: POST 1`,
          `author: author`,
        ],
      },
    ];

    const blogData = await generateBlogData();

    expect(blogData.posts.length).toBe(1);
    const post = blogData.posts[0];
    expect(post.title).toEqual('POST 1');
    expect(post.date).toEqual(new Date('2020-01-01T00:00:00.000Z'));
    expect(post.author).toEqual('author');
  });

  it('should collect the data from multiple md files', async () => {
    const currentDate = new Date();

    files = [
      {
        path: 'pages/en/blog/post1.md',
        frontMatterContent: [
          `date: '2020-01-01T00:00:00.000Z'`,
          `title: POST 1`,
          `author: author-a`,
        ],
      },
      {
        path: 'pages/en/blog/post2.md',
        frontMatterContent: [
          `date: '2020-01-02T00:00:00.000Z'`,
          `title: POST 2`,
          `author: author-b`,
        ],
      },
      {
        path: 'pages/en/blog/post3.md',
        frontMatterContent: [
          // no date specified (the date defaults to the current date)
          `title: POST 3`,
          `author: author-c`,
        ],
      },
    ];

    const blogData = await generateBlogData();

    expect(blogData.posts.length).toBe(3);
    expect(blogData.posts[0].title).toEqual('POST 1');
    expect(blogData.posts[0].date).toEqual(
      new Date('2020-01-01T00:00:00.000Z')
    );
    expect(blogData.posts[0].author).toEqual('author-a');
    expect(blogData.posts[1].title).toEqual('POST 2');
    expect(blogData.posts[1].date).toEqual(
      new Date('2020-01-02T00:00:00.000Z')
    );
    expect(blogData.posts[1].author).toEqual('author-b');
    expect(blogData.posts[2].title).toEqual('POST 3');
    expect(blogData.posts[2].date.setMilliseconds(0)).toEqual(
      currentDate.setMilliseconds(0)
    );
    expect(blogData.posts[2].author).toEqual('author-c');
  });

  it('should generate categories based on the categories of md files and their years', async () => {
    files = [
      {
        path: 'pages/en/blog/post1.md',
        frontMatterContent: [
          "date: '2020-01-01T00:00:00.000Z'",
          'category: category-a',
        ],
      },
      {
        path: 'pages/en/blog/sub-dir/post2.md',
        frontMatterContent: [
          "date: '2020-01-02T00:00:00.000Z'",
          'category: category-b',
        ],
      },
      {
        path: 'pages/en/blog/post3.md',
        frontMatterContent: [
          "date: '2021-03-13T00:00:00.000Z'",
          // no category specified (it should be "uncategorized")
        ],
      },
      {
        path: 'pages/en/blog/post4.md',
        frontMatterContent: [
          // no date specified (the date defaults to the current date)
          'category: category-b',
        ],
      },
    ];

    const blogData = await generateBlogData();

    expect(blogData.categories.sort()).toStrictEqual([
      'all',
      'category-a',
      'category-b',
      'uncategorized',
      'year-2020',
      'year-2021',
      `year-${new Date().getUTCFullYear()}`,
    ]);
  });

  it('should generate slugs based on the md filenames and categories', async () => {
    files = [
      {
        path: 'pages/en/blog/post1.md',
        frontMatterContent: ['category: category-a'],
      },
      {
        path: 'pages/en/blog/post2.md',
        frontMatterContent: ['category: category-b'],
      },
      {
        path: 'pages/en/blog/post3.md',
        frontMatterContent: [
          // no category specified
        ],
      },
    ];

    const blogData = await generateBlogData();

    expect(blogData.posts.map(p => p.slug).sort()).toStrictEqual([
      '/blog/category-a/post1',
      '/blog/category-b/post2',
      '/blog/uncategorized/post3',
    ]);
  });
});
