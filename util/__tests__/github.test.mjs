import { githubProfileAvatarUrl } from '@/util/github';

describe('githubProfileAvatarUrl', () => {
  it('returns the correct URL', () => {
    expect(githubProfileAvatarUrl('octocat')).toBe(
      'https://avatars.githubusercontent.com/octocat'
    );
  });
});
