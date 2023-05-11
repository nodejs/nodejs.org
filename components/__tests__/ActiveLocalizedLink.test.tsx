import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import ActiveLocalizedLink from '../ActiveLocalizedLink';
import { LocaleProvider } from '../../providers/localeProvider';
import type { AppProps } from '../../types';

const i18nData = { currentLocale: { code: 'en' } } as AppProps['i18nData'];

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
      <LocaleProvider i18nData={i18nData}>
        <IntlProvider locale="en" onError={() => {}}>
          <ActiveLocalizedLink
            className="link"
            activeClassName="active"
            href="/link"
          >
            Link
          </ActiveLocalizedLink>
        </IntlProvider>
      </LocaleProvider>
    );

    expect(screen.getByText('Link')).toHaveAttribute('href', '/en/link');
  });

  it('ignores active class when href not matches location.href', () => {
    render(
      <LocaleProvider i18nData={i18nData}>
        <IntlProvider locale="en" onError={() => {}}>
          <ActiveLocalizedLink
            className="link"
            activeClassName="active"
            href="/not-link"
          >
            Link
          </ActiveLocalizedLink>
        </IntlProvider>
      </LocaleProvider>
    );

    expect(screen.getByText('Link')).toHaveAttribute('class', 'link');
  });

  it('sets active class when href matches location.href', () => {
    render(
      <LocaleProvider i18nData={i18nData}>
        <IntlProvider locale="en" onError={() => {}}>
          <ActiveLocalizedLink
            className="link"
            activeClassName="active"
            href="/link"
          >
            Link
          </ActiveLocalizedLink>
        </IntlProvider>
      </LocaleProvider>
    );

    expect(screen.getByText('Link')).toHaveAttribute('class', 'link active');
  });
});
