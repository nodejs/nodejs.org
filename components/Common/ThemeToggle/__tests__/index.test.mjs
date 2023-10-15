import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LocaleProvider } from '@/providers/localeProvider';

import ThemeToggle from '../';

let mockCurrentTheme = 'light';

const toggleTheme = () => {
  mockCurrentTheme = mockCurrentTheme === 'light' ? 'dark' : 'light';
};

function renderThemeToggle() {
  return render(
    <LocaleProvider>
      <ThemeToggle toggleTheme={toggleTheme} />
    </LocaleProvider>
  );
}

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
