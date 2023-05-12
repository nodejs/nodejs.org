import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';
import { render, fireEvent, screen } from '@testing-library/react';
import Header from '..';
import { useMediaQuery } from '../../../../hooks/useMediaQuery';

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

// mock useMediaQuery hook for emulating mobile device
jest.mock('../../../../hooks/useMediaQuery', () => ({
  useMediaQuery: jest.fn(),
}));

describe('Tests for Header component', () => {
  beforeEach(() => {
    // @ts-ignore
    useMediaQuery.mockReturnValue(false);
  });

  afterEach(() => {
    mockToggleTheme.mockClear();
    mockCurrentTheme = 'dark';
  });

  it('renders shorter menu items for mobile', () => {
    mockCurrentTheme = 'dark';
    // @ts-ignore
    useMediaQuery.mockReturnValue(true);
    const { container } = render(
      <IntlProvider locale="en" onError={() => {}}>
        <Header />
      </IntlProvider>
    );

    expect(container).toMatchSnapshot();

    // @ts-ignore
    useMediaQuery.mockClear();
  });

  describe('Theme color switcher', () => {
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

    it('ignore key presses on color switcher', async () => {
      render(
        <IntlProvider locale="en" onError={() => {}}>
          <Header />
        </IntlProvider>
      );
      const toggler = screen.getByLabelText(
        'components.header.buttons.toggleDarkMode'
      );

      fireEvent.keyPress(toggler, { key: 'Enter', code: 13, charCode: 13 });

      expect(mockToggleTheme).toHaveBeenCalledTimes(0);
    });

    it('skips rendering in case no theme value was provided from plugin', () => {
      const { container } = render(
        <IntlProvider locale="en" onError={() => {}}>
          <Header />
        </IntlProvider>
      );
      expect(container).toMatchSnapshot();
    });
  });
});
