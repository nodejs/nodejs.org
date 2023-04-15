import React from 'react';
import { render } from '@testing-library/react';
import { AppProps } from '../../../../../types';
import { LocaleProvider } from '../../../../../providers/localeProvider';
import messages from '../../../../../i18n/locales/en.json';
import Author from '..';

const i18nData = {
  currentLocale: { code: 'en' },
  localeMessages: messages,
} as unknown as AppProps['i18nData'];

describe('Author component', () => {
  it('renders correctly', () => {
    const username = 'test-author';
    const { container } = render(
      <LocaleProvider i18nData={i18nData}>
        <Author username={username} size="60" />
      </LocaleProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('does not render without a username', () => {
    const { container } = render(
      <LocaleProvider i18nData={i18nData}>
        <Author username="" size="" />
      </LocaleProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
