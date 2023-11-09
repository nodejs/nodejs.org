import { render, screen } from '@testing-library/react';

import ActiveLocalizedLink from '..';

describe('ActiveLocalizedLink', () => {
  it('renders as localized link', () => {
    render(
      <ActiveLocalizedLink
        className="link"
        activeClassName="active"
        href="/link"
      >
        Link
      </ActiveLocalizedLink>
    );

    expect(screen.findByText('Link')).resolves.toHaveAttribute(
      'href',
      '/en/link'
    );
  });

  it('ignores active class when href not matches location.href', () => {
    render(
      <ActiveLocalizedLink
        className="link"
        activeClassName="active"
        href="/not-link"
      >
        Link
      </ActiveLocalizedLink>
    );

    expect(screen.findByText('Link')).resolves.toHaveAttribute('class', 'link');
  });

  it('sets active class when href matches location.href', () => {
    render(
      <ActiveLocalizedLink
        className="link"
        activeClassName="active"
        href="/link"
      >
        Link
      </ActiveLocalizedLink>
    );

    expect(screen.findByText('Link')).resolves.toHaveAttribute(
      'class',
      'link active'
    );
  });
});
