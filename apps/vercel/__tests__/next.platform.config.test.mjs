import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

describe('platform-vercel next.platform.config', () => {
  it('defines shiki mdx defaults for Vercel builds', async () => {
    const { default: platform } = await import('../next.platform.config.mjs');

    assert.deepEqual(platform.mdx, {
      wasm: true,
      twoslash: true,
    });
  });
});
