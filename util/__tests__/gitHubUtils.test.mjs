import {
  getGitHubAvatarUrl,
  createGitHubSlugger,
  getGitHubBlobUrl,
  getGitHubApiDocsUrl,
} from '@/util/gitHubUtils';

describe('GitHub utils', () => {
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
      'https://github.com/nodejs/nodejs.org/blob/main/pages/en/learn/getting-started/introduction.md';
    expect(result).toBe(expected);
  });

  it('getGitHubApiDocsUrl returns the correct URL', () => {
    const result = getGitHubApiDocsUrl('assert');
    const expected =
      'https://api.github.com/repos/nodejs/node/contents/doc/api?ref=assert';
    expect(result).toBe(expected);
  });
});
