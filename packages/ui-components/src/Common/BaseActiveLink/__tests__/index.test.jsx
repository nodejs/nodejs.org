import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { render, screen } from '@testing-library/react';

import ActiveLink from '..';

describe('ActiveLink', () => {
  it('renders as localized link', async () => {
    render(
      <ActiveLink className="link" activeClassName="active" href="/link">
        Link
      </ActiveLink>
    );

    assert.equal(
      (await screen.findByText('Link')).getAttribute('href'),
      '/link'
    );
  });

  it('ignores active class when href not matches location.href', async () => {
    render(
      <ActiveLink className="link" activeClassName="active" href="/not-link">
        Link
      </ActiveLink>
    );

    assert.equal(
      (await screen.findByText('Link')).getAttribute('class'),
      'link'
    );
  });

  it('sets active class when href matches location.href', async () => {
    render(
      <ActiveLink
        className="link"
        activeClassName="active"
        href="/link"
        pathname="/link"
      >
        Link
      </ActiveLink>
    );

    assert.equal(
      (await screen.findByText('Link')).getAttribute('class'),
      'link active'
    );
  });

  it('forces active class when active override is true regardless of pathname', async () => {
    render(
      <ActiveLink
        className="link"
        activeClassName="active"
        href="/link"
        pathname="/not-link"
        active
      >
        Link
      </ActiveLink>
    );

    assert.equal(
      (await screen.findByText('Link')).getAttribute('class'),
      'link active'
    );
  });

  it('forces inactive when active override is false even when pathname matches', async () => {
    render(
      <ActiveLink
        className="link"
        activeClassName="active"
        href="/link"
        pathname="/link"
        active={false}
      >
        Link
      </ActiveLink>
    );

    assert.equal(
      (await screen.findByText('Link')).getAttribute('class'),
      'link'
    );
  });
});
