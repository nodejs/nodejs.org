import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { getSideNavigation, getTopNavigation } from '#site/util/navigation';

const t = key => `t(${key})`;

describe('getTopNavigation', () => {
  it('translates the labels of the top navigation', () => {
    const [first] = getTopNavigation(t);

    assert.ok(first.key);
    assert.match(first.label, /^t\(/);
    assert.ok(first.link);
  });
});

describe('getSideNavigation', () => {
  it('returns the requested sections with their nested items', () => {
    const [about] = getSideNavigation(t, ['about']);

    assert.equal(about.key, 'about');
    assert.match(about.label, /^t\(/);
    assert.ok(about.items.length > 0);
    assert.ok(about.items.every(item => item.link && item.label));
  });
});
