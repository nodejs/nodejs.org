import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import Footer from '..';

// mock useRouter
jest.mock('next/router', () => ({
  useRouter() {
    return {
      locale: 'en',
    };
  },
}));

jest.mock('../../../../hooks/useLocale', () => ({
  useLocale: () => ({
    currentLocale: { code: 'en', name: 'English', localName: 'English' },
  }),
}));

describe('Tests for Footer component', () => {
  it('renders correctly', () => {
    const { container } = render(
      <IntlProvider locale="en" onError={() => {}}>
        <Footer />
      </IntlProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
