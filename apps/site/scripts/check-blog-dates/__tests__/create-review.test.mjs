import assert from 'node:assert/strict';
import { describe, it, beforeEach, afterEach } from 'node:test';

import {
  createReviewForFutureDates,
  buildCommentBody,
  BOT_USER_LOGIN,
  COMMENT_IDENTIFIER,
} from '../create-review.mjs';

const OLD_ENV = process.env;

beforeEach(() => {
  process.env = { ...OLD_ENV };
});

afterEach(() => {
  process.env = OLD_ENV;
});

describe('buildCommentBody', () => {
  it('should return resolved message when no future posts', () => {
    const result = buildCommentBody([]);

    assert.ok(
      result.includes(COMMENT_IDENTIFIER),
      'The comment body should include the COMMENT_IDENTIFIER'
    );
    assert.ok(
      result.includes('Future Blog Posts Status'),
      'The comment body should include the status'
    );
    assert.ok(
      result.includes('have been resolved'),
      'The comment body should indicate that the posts have been resolved'
    );
  });

  it('should format table with single future post', () => {
    const posts = [
      {
        slug: '/blog/test-post',
        title: 'Test Post',
        date: '2099-12-31T00:00:00.000Z',
        daysInFuture: 100,
      },
    ];

    const result = buildCommentBody(posts);

    assert.ok(
      result.includes(COMMENT_IDENTIFIER),
      'The comment body should include the COMMENT_IDENTIFIER'
    );
    assert.ok(
      result.includes('Future Blog Posts Detected'),
      'The comment body should include the detection message'
    );
    assert.ok(
      result.includes('**1 post scheduled in the future**'),
      'The comment body should include the number of future posts'
    );
    assert.ok(
      result.includes('/blog/test-post'),
      'The comment body should include the post slug'
    );
    assert.ok(
      result.includes('100 days'),
      'The comment body should include the number of days in the future'
    );
    assert.ok(
      result.includes('Scheduled'),
      'The comment body should include the status'
    );
  });

  it('should format table with multiple future posts', () => {
    const posts = [
      {
        slug: '/blog/post-1',
        title: 'Post 1',
        date: '2099-01-01T00:00:00.000Z',
        daysInFuture: 50,
      },
      {
        slug: '/blog/post-2',
        title: 'Post 2',
        date: '2099-02-01T00:00:00.000Z',
        daysInFuture: 80,
      },
    ];

    const result = buildCommentBody(posts);

    assert.ok(
      result.includes('**2 posts scheduled in the future**'),
      'The comment body should include the number of future posts'
    );
    assert.ok(
      result.includes('/blog/post-1'),
      'The comment body should include the first post slug'
    );
    assert.ok(
      result.includes('/blog/post-2'),
      'The comment body should include the second post slug'
    );
    assert.ok(
      result.includes('50 days'),
      'The comment body should include the number of days in the future for the first post'
    );
    assert.ok(
      result.includes('80 days'),
      'The comment body should include the number of days in the future for the second post'
    );
  });

  it('should handle singular day correctly', () => {
    const posts = [
      {
        slug: '/blog/test',
        title: 'Test',
        date: '2099-01-01T00:00:00.000Z',
        daysInFuture: 1,
      },
    ];

    const result = buildCommentBody(posts);

    assert.ok(
      result.includes('1 day'),
      "The comment body should use 'day' for a single day"
    );
    assert.ok(
      !result.includes('1 days'),
      "The comment body should not use 'days' for a single day"
    );
  });
});

describe('createReviewForFutureDates', () => {
  let mockGithub, mockContext, mockCore;

  const setFuturePostsEnv = posts => {
    process.env.FUTURE_POSTS_JSON = JSON.stringify(posts);
  };

  beforeEach(t => {
    delete process.env.FUTURE_POSTS_JSON;
    mockGithub = {
      rest: {
        issues: {
          createComment: t.mock.fn(() => Promise.resolve({ data: {} })),
          updateComment: t.mock.fn(() => Promise.resolve({ data: {} })),
          listComments: t.mock.fn(() => Promise.resolve({ data: [] })),
        },
      },
    };

    mockContext = {
      repo: { owner: 'nodejs', repo: 'nodejs.org' },
      issue: { number: 123 },
      payload: {
        pull_request: {
          head: { sha: 'abc123' },
        },
      },
    };

    mockCore = {
      info: t.mock.fn(),
      warning: t.mock.fn(),
    };
  });

  afterEach(() => {
    delete process.env.FUTURE_POSTS_JSON;
  });

  it('should skip when no future posts in env', async () => {
    delete process.env.FUTURE_POSTS_JSON;

    await createReviewForFutureDates({
      github: mockGithub,
      context: mockContext,
      core: mockCore,
    });

    assert.equal(mockGithub.rest.issues.createComment.mock.calls.length, 0);
    assert.equal(mockCore.info.mock.calls.length, 1);
    assert.ok(
      mockCore.info.mock.calls[0].arguments[0].includes(
        'No future posts found'
      ),
      'should log that no future posts were found'
    );
  });

  describe('Comment Handling', () => {
    const futurePost = {
      slug: '/blog/test',
      title: 'Test Post',
      date: '2099-01-01T00:00:00.000Z',
      daysInFuture: 100,
    };

    it('should create new comment when no existing comment', async () => {
      setFuturePostsEnv([futurePost]);

      await createReviewForFutureDates({
        github: mockGithub,
        context: mockContext,
        core: mockCore,
      });

      assert.equal(mockGithub.rest.issues.createComment.mock.calls.length, 1);
      assert.equal(mockGithub.rest.issues.updateComment.mock.calls.length, 0);

      const createCall =
        mockGithub.rest.issues.createComment.mock.calls[0].arguments[0];
      assert.equal(createCall.issue_number, 123);
      assert.ok(
        createCall.body.includes('/blog/test'),
        'The comment body should include the post slug'
      );
      assert.ok(
        createCall.body.includes(COMMENT_IDENTIFIER),
        'The comment body should include the COMMENT_IDENTIFIER'
      );
    });

    it('should update existing comment', async () => {
      setFuturePostsEnv([futurePost]);

      mockGithub.rest.issues.listComments.mock.mockImplementation(() =>
        Promise.resolve({
          data: [
            {
              id: 456,
              user: { login: BOT_USER_LOGIN },
              body: `${COMMENT_IDENTIFIER}\nOld content`,
            },
          ],
        })
      );

      await createReviewForFutureDates({
        github: mockGithub,
        context: mockContext,
        core: mockCore,
      });

      assert.equal(mockGithub.rest.issues.createComment.mock.calls.length, 0);
      assert.equal(mockGithub.rest.issues.updateComment.mock.calls.length, 1);

      const updateCall =
        mockGithub.rest.issues.updateComment.mock.calls[0].arguments[0];
      assert.equal(updateCall.comment_id, 456);
      assert.ok(
        updateCall.body.includes('/blog/test'),
        'The comment body should include the post slug'
      );
    });

    it('should handle comment creation failure gracefully', async () => {
      setFuturePostsEnv([futurePost]);

      mockGithub.rest.issues.createComment.mock.mockImplementation(() =>
        Promise.reject(new Error('API Error'))
      );

      await createReviewForFutureDates({
        github: mockGithub,
        context: mockContext,
        core: mockCore,
      });

      assert.equal(mockCore.warning.mock.calls.length, 1);
      assert.ok(
        mockCore.warning.mock.calls[0].arguments[0].includes(
          'Failed to upsert comment'
        ),
        'should warn about the failure'
      );
    });

    it('should handle comment update failure gracefully', async () => {
      setFuturePostsEnv([futurePost]);

      mockGithub.rest.issues.listComments.mock.mockImplementation(() =>
        Promise.resolve({
          data: [
            {
              id: 456,
              user: { login: BOT_USER_LOGIN },
              body: `${COMMENT_IDENTIFIER}\nOld`,
            },
          ],
        })
      );

      mockGithub.rest.issues.updateComment.mock.mockImplementation(() =>
        Promise.reject(new Error('API Error'))
      );

      await createReviewForFutureDates({
        github: mockGithub,
        context: mockContext,
        core: mockCore,
      });

      assert.equal(mockCore.warning.mock.calls.length, 1);
      assert.ok(
        mockCore.warning.mock.calls[0].arguments[0].includes(
          'Failed to upsert comment'
        ),
        'should warn about the failure'
      );
    });

    it('should skip non-bot comments when finding existing comment', async () => {
      setFuturePostsEnv([futurePost]);

      mockGithub.rest.issues.listComments.mock.mockImplementation(() =>
        Promise.resolve({
          data: [
            {
              id: 456,
              user: { login: 'human-user' },
              body: `${COMMENT_IDENTIFIER}\nHuman comment`,
            },
          ],
        })
      );

      await createReviewForFutureDates({
        github: mockGithub,
        context: mockContext,
        core: mockCore,
      });

      // Should create new comment, not update human's comment
      assert.equal(mockGithub.rest.issues.createComment.mock.calls.length, 1);
      assert.equal(mockGithub.rest.issues.updateComment.mock.calls.length, 0);
    });
  });

  describe('Post Filtering', () => {
    it('should filter out resolved posts based on current date', async () => {
      setFuturePostsEnv([
        {
          slug: '/blog/past-post',
          title: 'Past Post',
          date: '2020-01-01T00:00:00.000Z', // In the past
          daysInFuture: 1,
        },
        {
          slug: '/blog/future-post',
          title: 'Future Post',
          date: '2099-01-01T00:00:00.000Z', // In the future
          daysInFuture: 100,
        },
      ]);

      await createReviewForFutureDates({
        github: mockGithub,
        context: mockContext,
        core: mockCore,
      });

      const createCall =
        mockGithub.rest.issues.createComment.mock.calls[0].arguments[0];
      // Should only show Future Post (Past Post is resolved by current date)
      assert.ok(
        createCall.body.includes('/blog/future-post'),
        'The comment body should include the future post'
      );
      assert.ok(
        !createCall.body.includes('/blog/past-post'),
        'The comment body should not include the past post'
      );
      assert.ok(
        createCall.body.includes('1 post scheduled'),
        'The comment body should include the number of future posts'
      );
    });

    it('should show resolved message when all posts are resolved by current date', async () => {
      setFuturePostsEnv([
        {
          slug: '/blog/past-post',
          title: 'Past Post',
          date: '2020-01-01T00:00:00.000Z',
          daysInFuture: 1,
        },
      ]);

      await createReviewForFutureDates({
        github: mockGithub,
        context: mockContext,
        core: mockCore,
      });

      const createCall =
        mockGithub.rest.issues.createComment.mock.calls[0].arguments[0];
      assert.ok(
        createCall.body.includes('Future Blog Posts Status'),
        'The comment body should include the status'
      );
      assert.ok(
        !createCall.body.includes('/blog/past-post'),
        'The comment body should not include the past post'
      );
    });
  });

  it('should handle malformed FUTURE_POSTS_JSON', async () => {
    process.env.FUTURE_POSTS_JSON = 'invalid json {';

    await assert.rejects(
      async () => {
        await createReviewForFutureDates({
          github: mockGithub,
          context: mockContext,
          core: mockCore,
        });
      },
      {
        name: 'SyntaxError',
      }
    );
  });
});
