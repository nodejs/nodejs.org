import { render } from '@testing-library/react';
import { LocaleProvider } from '../../../providers/localeProvider';
import Footer from '..';
import type { AppProps } from '../../../types';

// mock useRouter
jest.mock('next/router', () => ({
  useRouter() {
    return {
      locale: 'en',
    };
  },
}));

const i18nData = { currentLocale: { code: 'en' } } as AppProps['i18nData'];

describe('Tests for Footer component', () => {
  it('renders correctly', () => {
    const { container } = render(
      <LocaleProvider i18nData={i18nData}>
        <Footer />
      </LocaleProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
