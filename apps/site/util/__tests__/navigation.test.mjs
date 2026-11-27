import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  getBreadcrumbs,
  getSideNavigation,
  getTopNavigation,
} from '#site/util/navigation';

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

describe('getBreadcrumbs', () => {
  const item = (key, link, items = []) => ({ key, label: key, link, items });

  const navigation = [
    item('about', '/about', [
      item('governance', '/about/governance'),
      item('getInvolved', '/about/get-involved', [
        item('events', '/about/get-involved/events'),
      ]),
      item('releases', '/about/previous-releases'),
    ]),
  ];

  it('follows the segments of the pathname through the navigation', () => {
    assert.deepEqual(getBreadcrumbs(navigation, '/about/get-involved/events'), [
      { label: 'about', href: '/about' },
      { label: 'getInvolved', href: '/about/get-involved' },
      { label: 'events', href: '/about/get-involved/events' },
    ]);
  });

  it('matches an item by its link when its key differs from the segment', () => {
    assert.deepEqual(getBreadcrumbs(navigation, '/about/previous-releases'), [
      { label: 'about', href: '/about' },
      { label: 'releases', href: '/about/previous-releases' },
    ]);
  });

  it('returns no breadcrumbs for a pathname outside of the navigation', () => {
    assert.deepEqual(getBreadcrumbs(navigation, '/download'), []);
  });
});
