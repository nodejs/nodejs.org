import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LocaleProvider } from '@/providers/localeProvider';

import ThemeToggle from '../';

function renderThemeToggle() {
  return render(
    <LocaleProvider>
      <ThemeToggle />
    </LocaleProvider>
  );
}

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

describe('ThemeToggle component', () => {
  it('switches dark theme to light theme', async () => {
    mockCurrentTheme = 'dark';
    renderThemeToggle();
    const toggle = screen.getByRole('button');
    await userEvent.click(toggle);
    expect(mockCurrentTheme).toBe('light');
  });

  it('switches light theme to dark theme', async () => {
    mockCurrentTheme = 'light';
    renderThemeToggle();
    const toggle = screen.getByRole('button');
    await userEvent.click(toggle);
    expect(mockCurrentTheme).toBe('dark');
  });

  it('switch when press enter', async () => {
    mockCurrentTheme = 'light';
    renderThemeToggle();
    const toggle = screen.getByRole('button');
    await userEvent.type(toggle, '{enter}');
    expect(mockCurrentTheme).toBe('dark');
  });
});
