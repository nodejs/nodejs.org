import assert from 'node:assert/strict';
import { it, describe } from 'node:test';

import { getLanguageDisplayName, LANGUAGES } from '../languages.mjs';

LANGUAGES.splice(
  0,
  LANGUAGES.length,
  { name: 'javascript', aliases: ['js'], displayName: 'JavaScript' },
  { name: 'typescript', aliases: ['ts'], displayName: 'TypeScript' }
);

describe('getLanguageDisplayName', async () => {
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
