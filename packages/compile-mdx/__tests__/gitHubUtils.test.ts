import { strictEqual } from 'node:assert';
import { describe, it } from 'node:test';

import { createGitHubSlugger } from '~/lib/utils/gitHubUtils';

describe('GitHub utils', () => {
  it('createGitHubSlugger returns a slugger', () => {
    const slugger = createGitHubSlugger();
    strictEqual(typeof slugger, 'function');
  });
});
