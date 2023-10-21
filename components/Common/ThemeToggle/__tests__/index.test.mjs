import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LocaleProvider } from '@/providers/localeProvider';

import ThemeToggle from '../';

let mockCurrentTheme = 'light';

const toggleTheme = () => {
  mockCurrentTheme = mockCurrentTheme === 'light' ? 'dark' : 'light';
};

let toggle;

beforeEach(() => {
  mockCurrentTheme = 'light';
  render(
    <LocaleProvider>
      <ThemeToggle onChange={toggleTheme} />
    </LocaleProvider>
  );
  toggle = screen.getByRole('button');
});

describe('ThemeToggle component', () => {
  it('switches dark theme to light theme', async () => {
    mockCurrentTheme = 'dark';
    await userEvent.click(toggle);
    expect(mockCurrentTheme).toBe('light');
  });

  it('switches light theme to dark theme', async () => {
    await userEvent.click(toggle);
    expect(mockCurrentTheme).toBe('dark');
  });

  it('switch when press enter', async () => {
    await userEvent.type(toggle, '{enter}');
    expect(mockCurrentTheme).toBe('dark');
  });
});
