import assert from 'node:assert/strict';
import { describe, it, mock } from 'node:test';

mock.module('github-slugger', {
  defaultExport: class {},
});

const { getGitHubAvatarUrl, createGitHubSlugger, getGitHubBlobUrl } =
  await import('#site/util/github');

describe('gitHubUtils', () => {
  it('getGitHubAvatarUrl returns the correct URL', () => {
    assert.equal(
      getGitHubAvatarUrl('583231'),
      'https://avatars.githubusercontent.com/u/583231'
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

  describe('getGitHubAvatarUrl', () => {
    it('should return a valid GitHub avatar URL by id', () => {
      assert.equal(
        getGitHubAvatarUrl('583231'),
        'https://avatars.githubusercontent.com/u/583231'
      );
    });

    it('should return the legacy username-based URL when useLegacyUrl is true', () => {
      assert.equal(
        getGitHubAvatarUrl('octocat', true),
        'https://avatars.githubusercontent.com/octocat'
      );
    });

    it('should use the id-based URL when useLegacyUrl is false', () => {
      assert.equal(
        getGitHubAvatarUrl('583231', false),
        'https://avatars.githubusercontent.com/u/583231'
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
});
