import assert from 'node:assert';
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
    assert.strictEqual(getLanguageDisplayName('javascript'), 'JavaScript');
    assert.strictEqual(getLanguageDisplayName('js'), 'JavaScript');
  });

  it('should return the display name for another known language', () => {
    assert.strictEqual(getLanguageDisplayName('typescript'), 'TypeScript');
    assert.strictEqual(getLanguageDisplayName('ts'), 'TypeScript');
  });

  it('should return the input language if it is not known', () => {
    assert.strictEqual(getLanguageDisplayName('unknown'), 'unknown');
  });
});
