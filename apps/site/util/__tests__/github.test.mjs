import assert from 'node:assert/strict';
import { describe, it, mock } from 'node:test';

mock.module('github-slugger', {
  defaultExport: class {},
});

const {
  getGitHubAvatarUrl,
  createGitHubSlugger,
  getGitHubBlobUrl,
  getGitHubApiDocsUrl,
} = await import('#site/util/github');

describe('gitHubUtils', () => {
  it('getGitHubAvatarUrl returns the correct URL', () => {
    assert.equal(
      getGitHubAvatarUrl('octocat'),
      'https://avatars.githubusercontent.com/octocat'
    );
  });

  it('createGitHubSlugger returns a slugger', () => {
    assert.notEqual(createGitHubSlugger(), undefined);
  });

  it('getGitHubBlobUrl returns the correct URL', () => {
    const result = getGitHubBlobUrl('learn/getting-started/introduction.md');
    const expected =
      'https://github.com/nodejs/nodejs.org/blob/main/apps/site/pages/en/learn/getting-started/introduction.md';
    assert.equal(result, expected);
  });

  it('getGitHubApiDocsUrl returns the correct URL', () => {
    const result = getGitHubApiDocsUrl('assert');
    const expected =
      'https://api.github.com/repos/nodejs/node/contents/doc/api?ref=assert';
    assert.equal(result, expected);
  });

  describe('getGitHubAvatarUrl', () => {
    it('should return a valid GitHub avatar URL', () => {
      assert.equal(
        getGitHubAvatarUrl('octocat'),
        'https://avatars.githubusercontent.com/octocat'
      );
    });
  });

  describe('getGitHubBlobUrl', () => {
    it('should return the correct blob URL', () => {
      assert.ok(
        getGitHubBlobUrl('testfile.md').includes(
          'blob/main/apps/site/pages/en/testfile.md'
        )
      );
    });
  });

  describe('getGitHubApiDocsUrl', () => {
    it('should return the correct API docs URL', () => {
      assert.equal(
        getGitHubApiDocsUrl('v18.x'),
        'https://api.github.com/repos/nodejs/node/contents/doc/api?ref=v18.x'
      );
    });
  });
});
