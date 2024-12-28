import {
  getGitHubAvatarUrl,
  createGitHubSlugger,
  getGitHubBlobUrl,
  getGitHubApiDocsUrl,
  getGitHubUser,
  getGitHubRepo,
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
      'https://github.com/nodejs/nodejs.org/blob/main/apps/site/pages/en/learn/getting-started/introduction.md';
    expect(result).toBe(expected);
  });

  it('getGitHubApiDocsUrl returns the correct URL', () => {
    const result = getGitHubApiDocsUrl('assert');
    const expected =
      'https://api.github.com/repos/nodejs/node/contents/doc/api?ref=assert';
    expect(result).toBe(expected);
  });

  it('getGitHubUser returns the correct user data', async () => {
    const mockUser = { login: 'octocat', id: 1 };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockUser),
      })
    );

    const result = await getGitHubUser('octocat');
    expect(result).toEqual(mockUser);
  });

  it('getGitHubRepo returns the correct repo data', async () => {
    const mockRepo = { name: 'nodejs.org', id: 1 };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockRepo),
      })
    );

    const result = await getGitHubRepo('nodejs/nodejs.org');
    expect(result).toEqual(mockRepo);
  });

  it('getGitHubUser handles errors correctly', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Failed to fetch'))
    );

    await expect(getGitHubUser('invalid-user')).rejects.toThrow(
      'Failed to fetch'
    );
  });

  it('getGitHubRepo handles errors correctly', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Failed to fetch'))
    );

    await expect(getGitHubRepo('invalid-repo')).rejects.toThrow(
      'Failed to fetch'
    );
  });
});
