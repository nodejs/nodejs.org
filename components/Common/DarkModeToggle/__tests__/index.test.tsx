import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DarkModeToggle from '../index';
import { IntlProvider } from 'react-intl';

let mockCurrentTheme = '';

const mockToggleTheme = jest.fn().mockImplementation(() => {
  mockCurrentTheme = mockCurrentTheme === 'dark' ? 'light' : 'dark';
});

// Mock dark mode module for controlling dark mode HOC behaviour
jest.mock('next-themes', () => ({
  useTheme: () => {
    return { theme: mockCurrentTheme, setTheme: mockToggleTheme };
  },
}));

describe('DarkModeToggle Component', () => {
  it('render dark mode toggle', () => {
    const { container } = render(
      <IntlProvider locale="en" onError={() => {}}>
        <DarkModeToggle />
      </IntlProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('switches dark theme to light theme', () => {
    mockCurrentTheme = 'dark';
    render(
      <IntlProvider locale="en" onError={() => {}}>
        <DarkModeToggle />
      </IntlProvider>
    );
    const toggle = screen.getByRole('button');
    userEvent.click(toggle);
    expect(mockCurrentTheme).toBe('light');
  });

  it('switches light theme to dark theme', () => {
    mockCurrentTheme = 'light';
    render(
      <IntlProvider locale="en" onError={() => {}}>
        <DarkModeToggle />
      </IntlProvider>
    );
    const toggle = screen.getByRole('button');
    userEvent.click(toggle);
    expect(mockCurrentTheme).toBe('dark');
  });
});
