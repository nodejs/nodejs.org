import {
  getGitHubAvatarUrl,
  getGitHubBlobUrl,
  getGitHubApiDocsUrl,
  createGitHubSlugger
} from '@/util/gitHubUtils';

describe('GitHub utils', () => {
  it('getGitHubAvatarUrl returns the correct URL', () => {
    expect(getGitHubAvatarUrl('octocat')).toBe(
      'https://avatars.githubusercontent.com/octocat'
    );
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

  it('createGitHubSlugger returns a function', () => {
    const slugger = createGitHubSlugger();
    expect(typeof slugger).toBe('function');
  });
});
