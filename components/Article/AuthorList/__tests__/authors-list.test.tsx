import React from 'react';
import { render } from '@testing-library/react';
import { LocaleProvider } from '../../../../providers/localeProvider';
import { AppProps } from '../../../../types';
import messages from '../../../../i18n/locales/en.json';
import AuthorsList from '..';

const i18nData = {
  currentLocale: { code: 'en' },
  localeMessages: messages,
} as unknown as AppProps['i18nData'];

describe('AuthorsList component', () => {
  it('renders correctly', () => {
    const authors = ['test-author', 'another-test-author'];
    const { container } = render(
      <LocaleProvider i18nData={i18nData}>
        <AuthorsList authors={authors} />
      </LocaleProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
