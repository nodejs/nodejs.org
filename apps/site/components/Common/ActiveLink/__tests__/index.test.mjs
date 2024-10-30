import { render, screen } from '@testing-library/react';

import { VERSION_SUPPORT_SHORTCUT } from '@/next.constants.mjs';

import ActiveLink from '..';

// mock usePathname, but retain all the other imports
jest.mock('@/navigation.mjs', () => ({
  ...jest.requireActual('@/navigation.mjs'),
  usePathname: jest.fn(),
}));

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

  it('does not set active class when href base does not match', () => {
    const { usePathname } = require('@/navigation.mjs');
    usePathname.mockReturnValue('/not-link/sublink');

    render(
      <ActiveLink
        className="link"
        activeClassName="active"
        allowSubPath={true}
        href={'/link/sub-link'}
      >
        Link
      </ActiveLink>
    );

    expect(screen.findByText('Link')).resolves.toHaveAttribute('class', 'link');
  });

  it('sets active class when href is other than VERSION_SUPPORT_SHORTCUT', () => {
    const { usePathname } = require('@/navigation.mjs');
    usePathname.mockReturnValue('/link/sublink');

    render(
      <ActiveLink
        className="link"
        activeClassName="active"
        allowSubPath={true}
        href={'/link/sub-link'}
      >
        Link
      </ActiveLink>
    );

    expect(screen.findByText('Link')).resolves.toHaveAttribute(
      'class',
      'link active'
    );
  });

  it('does not set active class when href is VERSION_SUPPORT_SHORTCUT', () => {
    const { usePathname } = require('@/navigation.mjs');
    usePathname.mockReturnValue(VERSION_SUPPORT_SHORTCUT);

    render(
      <ActiveLink
        className="link"
        activeClassName="active"
        allowSubPath={true}
        href={VERSION_SUPPORT_SHORTCUT}
      >
        Link
      </ActiveLink>
    );

    expect(screen.findByText('Link')).resolves.toHaveAttribute('class', 'link');
  });
});
