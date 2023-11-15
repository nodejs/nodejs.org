import { render, screen } from '@testing-library/react';

import ActiveLink from '..';

describe('ActiveLink', () => {
  it('renders as localized link', () => {
    render(
      <ActiveLink className="link" activeClassName="active" href="/link">
        Link
      </ActiveLink>
    );

    expect(screen.findByText('Link')).resolves.toHaveAttribute(
      'href',
      '/en/link'
    );
  });

  it('ignores active class when href not matches location.href', () => {
    render(
      <ActiveLink className="link" activeClassName="active" href="/not-link">
        Link
      </ActiveLink>
    );

    expect(screen.findByText('Link')).resolves.toHaveAttribute('class', 'link');
  });

  it('sets active class when href matches location.href', () => {
    render(
      <ActiveLink className="link" activeClassName="active" href="/link">
        Link
      </ActiveLink>
    );

    expect(screen.findByText('Link')).resolves.toHaveAttribute(
      'class',
      'link active'
    );
  });
});
