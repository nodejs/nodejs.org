import { getGitHubAvatarUrl } from '@/util/gitHubUtils';

describe('Github utils', () => {
  it('getGitHubAvatarUrl returns the correct URL', () => {
    expect(getGitHubAvatarUrl('octocat')).toBe(
      'https://avatars.githubusercontent.com/octocat'
    );
  });
});
