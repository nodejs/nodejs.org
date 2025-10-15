import assert from 'node:assert/strict';
import { describe, it, beforeEach, afterEach } from 'node:test';

import { checkBlogDates, checkAndFormatBlogDates } from '../index.mjs';

const OLD_ENV = process.env;

beforeEach(() => {
  process.env = { ...OLD_ENV };
});

afterEach(() => {
  process.env = OLD_ENV;
});

describe('checkBlogDates', () => {
  const mockBlogData = {
    posts: [
      { slug: '/blog/past-post', title: 'Past Post', date: '2024-01-01' },
      { slug: '/blog/future-post', title: 'Future Post', date: '2025-12-31' },
      {
        slug: '/blog/another-future',
        title: 'Another Future',
        date: '2025-11-15',
      },
    ],
  };

  it('should return no future posts when all posts are in the past', async () => {
    const mockGenerator = async () => mockBlogData;
    const currentDate = new Date('2026-01-01');

    const result = await checkBlogDates(currentDate, mockGenerator);

    assert.equal(result.hasFuturePosts, false);
    assert.equal(result.futurePosts.length, 0);
  });

  it('should detect future posts correctly', async () => {
    const mockGenerator = async () => mockBlogData;
    const currentDate = new Date('2025-01-01');

    const result = await checkBlogDates(currentDate, mockGenerator);

    assert.equal(result.hasFuturePosts, true);
    assert.equal(result.futurePosts.length, 2);
    assert.equal(result.futurePosts[0].slug, '/blog/future-post');
    assert.equal(result.futurePosts[1].slug, '/blog/another-future');
  });

  it('should calculate days in future correctly', async () => {
    const mockGenerator = async () => mockBlogData;
    const currentDate = new Date('2025-12-30');

    const result = await checkBlogDates(currentDate, mockGenerator);

    assert.equal(result.hasFuturePosts, true);
    assert.equal(result.futurePosts.length, 1);
    assert.equal(result.futurePosts[0].daysInFuture, 1);
  });

  it('should handle empty blog data', async () => {
    const mockGenerator = async () => ({ posts: [] });
    const currentDate = new Date('2025-01-01');

    const result = await checkBlogDates(currentDate, mockGenerator);

    assert.equal(result.hasFuturePosts, false);
    assert.equal(result.futurePosts.length, 0);
  });

  it('should include all required fields in future posts', async () => {
    const mockGenerator = async () => mockBlogData;
    const currentDate = new Date('2025-01-01');

    const result = await checkBlogDates(currentDate, mockGenerator);

    result.futurePosts.forEach(post => {
      assert.ok(post.slug, 'post should have a slug');
      assert.ok(post.title, 'post should have a title');
      assert.ok(post.date, 'post should have a date');
      assert.ok(
        typeof post.daysInFuture === 'number',
        'daysInFuture should be a number'
      );
      assert.ok(post.daysInFuture > 0, 'daysInFuture should be greater than 0');
    });
  });

  it('should handle post date exactly equal to current date', async () => {
    const mockData = {
      posts: [
        {
          slug: '/blog/exact',
          title: 'Exact',
          date: '2025-01-01T00:00:00.000Z',
        },
      ],
    };
    const mockGenerator = async () => mockData;
    const currentDate = new Date('2025-01-01T00:00:00.000Z');

    const result = await checkBlogDates(currentDate, mockGenerator);

    assert.equal(result.hasFuturePosts, false);
    assert.equal(result.futurePosts.length, 0);
  });

  it('should handle timezone boundaries correctly', async () => {
    const mockData = {
      posts: [
        {
          slug: '/blog/tz-test',
          title: 'TZ Test',
          date: '2025-01-01T23:59:59.999Z',
        },
      ],
    };
    const mockGenerator = async () => mockData;
    const currentDate = new Date('2025-01-01T23:59:59.998Z');

    const result = await checkBlogDates(currentDate, mockGenerator);

    assert.equal(result.hasFuturePosts, true);
    assert.equal(result.futurePosts.length, 1);
  });

  it('should handle blogDataGenerator failure in checkBlogDates', async () => {
    const mockGenerator = async () => {
      throw new Error('Generator Error');
    };
    const currentDate = new Date('2025-01-01');

    await assert.rejects(
      async () => {
        await checkBlogDates(currentDate, mockGenerator);
      },
      {
        name: 'Error',
        message: 'Generator Error',
      }
    );
  });
});

describe('checkAndFormatBlogDates', () => {
  let mockCore, mockGithub, mockContext;

  beforeEach(t => {
    mockCore = {
      info: t.mock.fn(),
      setOutput: t.mock.fn(),
      warning: t.mock.fn(),
    };

    mockGithub = {};

    mockContext = {
      repo: { owner: 'nodejs', repo: 'nodejs.org' },
      payload: {
        pull_request: {
          number: 123,
          head: { sha: 'abc123' },
        },
      },
    };
  });

  it('should skip when not in PR context (no github)', async () => {
    await checkAndFormatBlogDates({
      core: mockCore,
      github: null,
      context: mockContext,
    });

    assert.equal(mockCore.info.mock.calls.length, 1);
    assert.ok(
      mockCore.info.mock.calls[0].arguments[0].includes(
        'Not running in a PR context'
      ),
      'should log that it is not running in a PR context'
    );
    assert.equal(mockCore.setOutput.mock.calls.length, 1);
    assert.equal(
      mockCore.setOutput.mock.calls[0].arguments[0],
      'FUTURE_POSTS_JSON'
    );
    assert.equal(mockCore.setOutput.mock.calls[0].arguments[1], '[]');
  });

  it('should skip when not in PR context (no context)', async () => {
    await checkAndFormatBlogDates({
      core: mockCore,
      github: mockGithub,
      context: null,
    });

    assert.equal(mockCore.info.mock.calls.length, 1);
    assert.ok(
      mockCore.info.mock.calls[0].arguments[0].includes(
        'Not running in a PR context'
      ),
      'should log that it is not running in a PR context'
    );
    assert.equal(mockCore.setOutput.mock.calls.length, 1);
    assert.equal(
      mockCore.setOutput.mock.calls[0].arguments[0],
      'FUTURE_POSTS_JSON'
    );
    assert.equal(mockCore.setOutput.mock.calls[0].arguments[1], '[]');
  });

  it('should skip when not in PR context (no pull_request)', async () => {
    await checkAndFormatBlogDates({
      core: mockCore,
      github: mockGithub,
      context: { repo: { owner: 'nodejs', repo: 'nodejs.org' } },
    });

    assert.equal(mockCore.info.mock.calls.length, 1);
    assert.ok(
      mockCore.info.mock.calls[0].arguments[0].includes(
        'Not running in a PR context'
      ),
      'should log that it is not running in a PR context'
    );
    assert.equal(mockCore.setOutput.mock.calls.length, 1);
    assert.equal(
      mockCore.setOutput.mock.calls[0].arguments[0],
      'FUTURE_POSTS_JSON'
    );
    assert.equal(mockCore.setOutput.mock.calls[0].arguments[1], '[]');
  });

  it('should set FUTURE_POSTS_JSON to empty array when no future posts exist', async () => {
    const mockBlogDataGenerator = async () => ({
      futurePosts: [],
      hasFuturePosts: false,
    });

    await checkAndFormatBlogDates({
      core: mockCore,
      github: mockGithub,
      context: mockContext,
      blogDataGenerator: mockBlogDataGenerator,
    });

    const jsonCall = mockCore.setOutput.mock.calls.find(
      call => call.arguments[0] === 'FUTURE_POSTS_JSON'
    );
    assert.ok(jsonCall, 'FUTURE_POSTS_JSON should be set');
    assert.equal(jsonCall.arguments[1], '[]');
  });

  it('should set FUTURE_POSTS_JSON when future posts exist', async () => {
    const mockBlogDataGenerator = async () => ({
      futurePosts: [
        {
          slug: '/blog/future-post',
          title: 'Future Post',
          date: '2099-12-31T00:00:00.000Z',
          daysInFuture: 100,
        },
      ],
      hasFuturePosts: true,
    });

    await checkAndFormatBlogDates({
      core: mockCore,
      github: mockGithub,
      context: mockContext,
      blogDataGenerator: mockBlogDataGenerator,
    });

    const jsonCall = mockCore.setOutput.mock.calls.find(
      call => call.arguments[0] === 'FUTURE_POSTS_JSON'
    );
    assert.ok(jsonCall, 'FUTURE_POSTS_JSON should be set');
    assert.ok(
      jsonCall.arguments[1].includes('/blog/future-post'),
      'The JSON should include the future post'
    );
  });

  it('should handle blogDataGenerator failure in checkAndFormatBlogDates', async () => {
    const mockBlogDataGenerator = async () => {
      throw new Error('Generator Error');
    };

    await assert.rejects(
      async () => {
        await checkAndFormatBlogDates({
          core: mockCore,
          github: mockGithub,
          context: mockContext,
          blogDataGenerator: mockBlogDataGenerator,
        });
      },
      {
        name: 'Error',
        message: 'Generator Error',
      }
    );
  });
});
