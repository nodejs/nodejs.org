import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';
import { render, screen } from '@testing-library/react';
import Header from '..';

let mockCurrentTheme = 'light';

const mockToggleTheme = jest.fn().mockImplementation(() => {
  mockCurrentTheme = mockCurrentTheme === 'dark' ? 'light' : 'dark';
});

// Mock dark mode module for controlling dark mode HOC behaviour
jest.mock('next-themes', () => ({
  useTheme: () => {
    return { theme: mockCurrentTheme, setTheme: mockToggleTheme };
  },
}));

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
    availableLocales: [
      { code: 'en', name: 'English', localName: 'English' },
      { code: 'es', name: 'Spanish', localName: 'Español' },
    ],
  }),
}));

describe('Tests for Header component', () => {
  it('switches logo between light & dark', async () => {
    mockCurrentTheme = 'light';
    render(
      <IntlProvider locale="en" onError={() => {}}>
        <Header />
      </IntlProvider>
    );

    const lightLogo = screen.getByAltText('light-logo');
    expect(lightLogo).toBeInTheDocument();

    const toggle = screen.getByLabelText(
      'components.header.buttons.toggleDarkMode'
    );
    await userEvent.click(toggle);

    const darkLogo = screen.getByAltText('dark-logo');
    expect(darkLogo).toBeInTheDocument();
  });
});
