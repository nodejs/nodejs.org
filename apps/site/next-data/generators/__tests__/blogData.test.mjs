import assert from 'node:assert/strict';
import { normalize } from 'node:path';
import { Readable } from 'node:stream';
import { describe, it, mock } from 'node:test';

let files = [];

mock.module('node:fs', {
  namedExports: {
    createReadStream: filename => {
      const readable = new Readable();
      const file = files.find(f => filename.endsWith(normalize(f.path)));
      readable.push(`---\n`);
      file.frontMatterContent.forEach(line => readable.push(`${line}\n`));
      readable.push(`---\n`);
      readable.push(null);
      readable.close = () => {};
      return readable;
    },
  },
});

mock.module('../../../next.helpers.mjs', {
  namedExports: {
    getMarkdownFiles: () => {
      return Promise.resolve(files.map(file => file.path));
    },
  },
});

const generateBlogData = (await import('../blogData.mjs')).default;

describe('generateBlogData', () => {
  it('should return zero posts and only the default "all" category if no md file is found', async () => {
    files = [];

    const blogData = await generateBlogData();

    assert.deepEqual(blogData.categories, ['all']);
    assert.deepEqual(blogData.posts, []);
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

    assert.equal(blogData.posts.length, 1);
    const post = blogData.posts[0];
    assert.equal(post.title, 'POST 1');
    assert.deepEqual(post.date, new Date('2020-01-01T00:00:00.000Z'));
    assert.equal(post.author, 'author');
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

    assert.equal(blogData.posts.length, 1);
    const post = blogData.posts[0];
    assert.equal(post.title, 'POST 1');
    assert.deepEqual(post.date, new Date('2020-01-01T00:00:00.000Z'));
    assert.equal(post.author, 'author');
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

    assert(blogData.posts.length, 3);
    assert.equal(blogData.posts[0].title, 'POST 1');
    assert.deepEqual(
      blogData.posts[0].date,
      new Date('2020-01-01T00:00:00.000Z')
    );
    assert.equal(blogData.posts[0].author, 'author-a');
    assert.equal(blogData.posts[1].title, 'POST 2');
    assert.deepEqual(
      blogData.posts[1].date,
      new Date('2020-01-02T00:00:00.000Z')
    );
    assert.equal(blogData.posts[1].author, 'author-b');
    assert.equal(blogData.posts[2].title, 'POST 3');
    assert.equal(
      blogData.posts[2].date.setMilliseconds(0),
      currentDate.setMilliseconds(0)
    );
    assert.equal(blogData.posts[2].author, 'author-c');
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

    assert.deepEqual(blogData.categories.sort(), [
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

    assert.deepEqual(blogData.posts.map(p => p.slug).sort(), [
      '/blog/category-a/post1',
      '/blog/category-b/post2',
      '/blog/uncategorized/post3',
    ]);
  });
});
