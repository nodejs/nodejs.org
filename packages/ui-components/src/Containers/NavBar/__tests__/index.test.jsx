import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import NavBar from '..';

const Logo = () => <span>Node.js</span>;

describe('NavBar', () => {
  it('uses a keyboard-accessible button to toggle the mobile navigation', async () => {
    const user = userEvent.setup();

    render(
      <NavBar
        as="a"
        Logo={Logo}
        pathname="/"
        sidebarItemTogglerAriaLabel="Toggle navigation menu"
        navItems={[
          { text: 'Learn', link: '/learn' },
          { text: 'About', link: '/about' },
        ]}
      >
        <a href="/search">Search</a>
      </NavBar>
    );

    const menuButton = screen.getByRole('button', {
      name: 'Toggle navigation menu',
    });
    const navigation = screen
      .getByRole('navigation')
      .querySelector('#navbar-navigation');

    assert.ok(menuButton);
    assert.ok(navigation);
    assert.equal(menuButton.tagName, 'BUTTON');
    assert.equal(menuButton.getAttribute('tabindex'), null);
    assert.equal(menuButton.getAttribute('aria-expanded'), 'false');
    assert.match(navigation.className, /\bhidden\b/);

    await user.click(menuButton);

    assert.equal(menuButton.getAttribute('aria-expanded'), 'true');
    assert.match(navigation.className, /\bflex\b/);

    await user.click(menuButton);

    assert.equal(menuButton.getAttribute('aria-expanded'), 'false');
    assert.match(navigation.className, /\bhidden\b/);
  });
});
