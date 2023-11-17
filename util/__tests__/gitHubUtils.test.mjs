import { strictEqual } from 'node:assert';
import { describe, it } from 'node:test';

import { githubProfileAvatarUrl } from '@/util/gitHubUtils';

describe('Github utils', () => {
  it('githubProfileAvatarUrl returns the correct URL', () => {
    strictEqual(
      githubProfileAvatarUrl('octocat'),
      'https://avatars.githubusercontent.com/octocat'
    );
  });
});
