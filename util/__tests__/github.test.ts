import { userNameToAvatarUrl } from '@/util/github';

describe('userNameToAvatarUrl', () => {
  it('returns the correct URL', () => {
    expect(userNameToAvatarUrl('octocat')).toBe(
      'https://avatars.githubusercontent.com/octocat'
    );
  });
});
