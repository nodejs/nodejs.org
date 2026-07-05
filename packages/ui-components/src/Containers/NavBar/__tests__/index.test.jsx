import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { getActiveNavLink } from '..';

const navItems = [
  { link: '/about' },
  { link: '/about/sponsors' },
  { link: '/docs' },
  { link: 'https://nodejs.org/learn' },
];

describe('getActiveNavLink', () => {
  it('picks the most specific sibling on its own pages', () => {
    assert.equal(
      getActiveNavLink(navItems, '/about/sponsors'),
      '/about/sponsors'
    );
  });

  it('keeps the parent active on its other sub-pages', () => {
    assert.equal(
      getActiveNavLink(navItems, '/about/governance/charter'),
      '/about'
    );
  });

  it('matches the parent on its own index page', () => {
    assert.equal(getActiveNavLink(navItems, '/about'), '/about');
  });

  it('does not match across word boundaries', () => {
    assert.equal(getActiveNavLink(navItems, '/about-us'), '');
  });

  it('never returns an external (non-internal) link', () => {
    assert.equal(getActiveNavLink(navItems, 'https://nodejs.org/learn'), '');
  });

  it('returns empty string when nothing matches', () => {
    assert.equal(getActiveNavLink(navItems, '/unknown'), '');
  });
});
