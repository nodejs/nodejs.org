import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { getCodeTabId, slugifyIdSegment } from '../getCodeTabId';

describe('getCodeTabId', () => {
  it('includes the tab index in fragments', () => {
    assert.equal(getCodeTabId('install', 'js', 0), 'install-js-0');
    assert.equal(getCodeTabId('install', 'cjs', 1), 'install-cjs-1');
  });

  it('slugifies labels and prefixes numeric segments', () => {
    assert.equal(slugifyIdSegment('Hello World'), 'hello-world');
    assert.equal(slugifyIdSegment('123'), 'id-123');
    assert.equal(slugifyIdSegment('codetabs-:r1:'), 'codetabs-r1');
    assert.equal(getCodeTabId('install-steps', 'C++', 0), 'install-steps-c-0');
  });

  it('falls back to `tab` for empty input', () => {
    assert.equal(slugifyIdSegment('   '), 'tab');
    assert.equal(getCodeTabId('install', '', 0), 'install-tab-0');
  });

  it('preserves case in the prepared React instance prefix', () => {
    assert.notEqual(
      getCodeTabId('codetabs-R1', 'js', 0),
      getCodeTabId('codetabs-r1', 'js', 0)
    );
  });
});
