import {
  getGitHubAvatarUrl,
  createGitHubSlugger,
  getGitHubBlobUrl,
  getGitHubApiDocsUrl,
} from '@/util/gitHubUtils';

describe('gitHubUtils', () => {
  it('getGitHubAvatarUrl returns the correct URL', () => {
    expect(getGitHubAvatarUrl('octocat')).toBe(
      'https://avatars.githubusercontent.com/octocat'
    );
  });

  it('createGitHubSlugger returns a slugger', () => {
    const slugger = createGitHubSlugger();
    expect(slugger).toBeDefined();
  });

  it('getGitHubBlobUrl returns the correct URL', () => {
    const result = getGitHubBlobUrl('learn/getting-started/introduction.md');
    const expected =
      'https://github.com/nodejs/nodejs.org/blob/main/apps/site/pages/en/learn/getting-started/introduction.md';
    expect(result).toBe(expected);
  });

  it('getGitHubApiDocsUrl returns the correct URL', () => {
    const result = getGitHubApiDocsUrl('assert');
    const expected =
      'https://api.github.com/repos/nodejs/node/contents/doc/api?ref=assert';
    expect(result).toBe(expected);
  });

  describe('getGitHubAvatarUrl', () => {
    it('should return a valid GitHub avatar URL', () => {
      expect(getGitHubAvatarUrl('octocat')).toBe(
        'https://avatars.githubusercontent.com/octocat'
      );
    });
  });

  describe('getGitHubBlobUrl', () => {
    it('should return the correct blob URL', () => {
      expect(getGitHubBlobUrl('testfile.md')).toContain(
        'blob/main/apps/site/pages/en/testfile.md'
      );
    });
  });

  describe('getGitHubApiDocsUrl', () => {
    it('should return the correct API docs URL', () => {
      expect(getGitHubApiDocsUrl('v18.x')).toBe(
        'https://api.github.com/repos/nodejs/node/contents/doc/api?ref=v18.x'
      );
    });
  });
});
