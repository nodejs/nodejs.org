import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LocaleProvider } from '../../../../providers/localeProvider';
import messages from '../../../../i18n/locales/en.json';
import DarkModeToggle from '../index';
import { AppProps } from '../../../../types';

const i18nData = {
  currentLocale: { code: 'en' },
  localeMessages: messages,
} as unknown as AppProps['i18nData'];

let mockCurrentTheme = '';

const mockToggleTheme = jest.fn().mockImplementation(() => {
  mockCurrentTheme = mockCurrentTheme === 'dark' ? 'light' : 'dark';
});

// // mock dark mode module for controlling dark mode HOC behavior
jest.mock('next-themes', () => ({
  useTheme: () => {
    return { theme: mockCurrentTheme, setTheme: mockToggleTheme };
  },
}));

describe('DarkModeToggle Component', () => {
  it('render dark mode toggle', () => {
    const { container } = render(
      <LocaleProvider i18nData={i18nData}>
        <DarkModeToggle />
      </LocaleProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('switches dark theme to light theme', async () => {
    mockCurrentTheme = 'dark';
    render(
      <LocaleProvider i18nData={i18nData}>
        <DarkModeToggle />
      </LocaleProvider>
    );
    const toggle = screen.getByRole('button');
    // const toggle = await screen.findByText('Toggle Dark Mode');
    await userEvent.click(toggle);
    expect(mockCurrentTheme).toBe('light');
  });

  it('switches light theme to dark theme', async () => {
    mockCurrentTheme = 'light';
    render(
      <LocaleProvider i18nData={i18nData}>
        <DarkModeToggle />
      </LocaleProvider>
    );
    // const toggle = await screen.findByText('Toggle Dark Mode');
    const toggle = screen.getByRole('button');
    await userEvent.click(toggle);
    expect(mockCurrentTheme).toBe('dark');
  });
});
