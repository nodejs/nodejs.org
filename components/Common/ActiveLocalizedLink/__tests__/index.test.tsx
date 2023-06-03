import { IntlProvider } from 'react-intl';
import { render, screen } from '@testing-library/react';
import ActiveLocalizedLink from '..';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      isReady: true,
      asPath: '/link',
    };
  },
}));

describe('ActiveLocalizedLink', () => {
  it('renders as localized link', () => {
    render(
      <IntlProvider locale="en" onError={() => {}}>
        <ActiveLocalizedLink
          className="link"
          activeClassName="active"
          href="/link"
        >
          Link
        </ActiveLocalizedLink>
      </IntlProvider>
    );

    expect(screen.getByText('Link')).toHaveAttribute('href', '/en/link');
  });

  it('ignores active class when href not matches location.href', () => {
    render(
      <IntlProvider locale="en" onError={() => {}}>
        <ActiveLocalizedLink
          className="link"
          activeClassName="active"
          href="/not-link"
        >
          Link
        </ActiveLocalizedLink>
      </IntlProvider>
    );

    expect(screen.getByText('Link')).toHaveAttribute('class', 'link');
  });

  it('sets active class when href matches location.href', () => {
    render(
      <IntlProvider locale="en" onError={() => {}}>
        <ActiveLocalizedLink
          className="link"
          activeClassName="active"
          href="/link"
        >
          Link
        </ActiveLocalizedLink>
      </IntlProvider>
    );

    expect(screen.getByText('Link')).toHaveAttribute('class', 'link active');
  });
});
