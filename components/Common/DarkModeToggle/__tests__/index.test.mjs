import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';
import DarkModeToggle from '..';

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

describe('DarkModeToggle Component', () => {
  it('switches dark theme to light theme', async () => {
    const user = userEvent.setup();
    mockCurrentTheme = 'dark';
    render(
      <IntlProvider locale="en" onError={() => {}}>
        <DarkModeToggle />
      </IntlProvider>
    );
    const toggle = screen.getByRole('button');
    await user.click(toggle);
    expect(mockCurrentTheme).toBe('light');
  });

  it('switches light theme to dark theme', async () => {
    const user = userEvent.setup();
    mockCurrentTheme = 'light';
    render(
      <IntlProvider locale="en" onError={() => {}}>
        <DarkModeToggle />
      </IntlProvider>
    );
    const toggle = screen.getByRole('button');
    await user.click(toggle);
    expect(mockCurrentTheme).toBe('dark');
  });
});
