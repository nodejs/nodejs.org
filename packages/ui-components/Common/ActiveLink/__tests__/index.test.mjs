import { render, screen } from '@testing-library/react';

import ActiveLink from '..';

const props = {
  className: 'link',
  activeClassName: 'active',
  Wrapper: 'a',
  pathname: '/',
};

describe('ActiveLink', () => {
  it('renders as localized link', () => {
    render(
      <ActiveLink href="/link" {...props}>
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
      <ActiveLink href="/not-link" {...props}>
        Link
      </ActiveLink>
    );

    expect(screen.findByText('Link')).resolves.toHaveAttribute('class', 'link');
  });

  it('sets active class when href matches location.href', () => {
    render(
      <ActiveLink href="/link" {...props}>
        Link
      </ActiveLink>
    );

    expect(screen.findByText('Link')).resolves.toHaveAttribute(
      'class',
      'link active'
    );
  });

  it('does not set active class when href base does not match', () => {
    render(
      <ActiveLink
        allowSubPath={true}
        href={'/link/sub-link'}
        {...props}
        pathname="/not-link/sublink"
      >
        Link
      </ActiveLink>
    );

    expect(screen.findByText('Link')).resolves.toHaveAttribute('class', 'link');
  });
});
