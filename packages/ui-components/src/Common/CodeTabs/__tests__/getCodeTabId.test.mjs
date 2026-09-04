import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { getCodeTabId, slugifyIdSegment } from '../getCodeTabId';

describe('getCodeTabId', () => {
  it('builds `{groupId}-{tabKey}` fragments', () => {
    assert.equal(getCodeTabId('install', 'js-0'), 'install-js-0');
    assert.equal(getCodeTabId('install', 'cjs-1'), 'install-cjs-1');
  });

  it('slugifies labels and prefixes numeric segments', () => {
    assert.equal(slugifyIdSegment('Hello World'), 'hello-world');
    assert.equal(slugifyIdSegment('123'), 'id-123');
    assert.equal(slugifyIdSegment('codetabs-:r1:'), 'codetabs-r1');
    assert.equal(getCodeTabId('Install Steps', 'C++'), 'install-steps-c');
  });

  it('falls back to `tab` for empty input', () => {
    assert.equal(slugifyIdSegment('   '), 'tab');
    assert.equal(getCodeTabId('', 'js'), 'tab-js');
  });
});
