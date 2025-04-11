import assert from 'node:assert/strict';
import { it, describe, mock } from 'node:test';

describe('getLanguageDisplayName', async () => {
  mock.module('@/shiki.config.mjs', {
    namedExports: {
      LANGUAGES: [
        { name: 'javascript', aliases: ['js'], displayName: 'JavaScript' },
        { name: 'typescript', aliases: ['ts'], displayName: 'TypeScript' },
      ],
    },
  });

  const { getLanguageDisplayName } = await import(
    '@/util/getLanguageDisplayName'
  );

  it('should return the display name for a known language', () => {
    assert.equal(getLanguageDisplayName('javascript'), 'JavaScript');
    assert.equal(getLanguageDisplayName('js'), 'JavaScript');
  });

  it('should return the display name for another known language', () => {
    assert.equal(getLanguageDisplayName('typescript'), 'TypeScript');
    assert.equal(getLanguageDisplayName('ts'), 'TypeScript');
  });

  it('should return the input language if it is not known', () => {
    assert.equal(getLanguageDisplayName('unknown'), 'unknown');
  });
});
