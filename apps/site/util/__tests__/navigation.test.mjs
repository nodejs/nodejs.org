import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { describe, it } from 'node:test';

import navigation from '../../navigation.json' with { type: 'json' };

describe('navigation config', () => {
  it('does not expose the retired Mastodon account', () => {
    assert.equal(
      navigation.socialLinks.some(
        ({ link }) => link === 'https://social.lfx.dev/@nodejs'
      ),
      false
    );
  });

  it('does not keep the retired Mastodon profile in the root layout', async () => {
    const layout = await readFile(
      new URL('../../app/[locale]/layout.tsx', import.meta.url),
      'utf8'
    );

    assert.equal(layout.includes('https://social.lfx.dev/@nodejs'), false);
  });
});
