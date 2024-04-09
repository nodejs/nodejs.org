import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { STORYBOOK_MODE_THEME } from '@/.storybook/constants';

import ThemeToggle from '../';

let mockCurrentTheme = STORYBOOK_MODE_THEME.light;

const toggleTheme = () => {
  mockCurrentTheme =
    mockCurrentTheme === STORYBOOK_MODE_THEME.light
      ? STORYBOOK_MODE_THEME.dark
      : STORYBOOK_MODE_THEME.light;
};

describe('ThemeToggle', () => {
  let toggle;

  beforeEach(() => {
    mockCurrentTheme = STORYBOOK_MODE_THEME.light;

    render(<ThemeToggle onClick={toggleTheme} />);
    toggle = screen.getByRole('button');
  });

  it('switches dark theme to light theme', async () => {
    mockCurrentTheme = STORYBOOK_MODE_THEME.dark;
    await userEvent.click(toggle);
    expect(mockCurrentTheme).toBe(STORYBOOK_MODE_THEME.light);
  });

  it('switches light theme to dark theme', async () => {
    await userEvent.click(toggle);
    expect(mockCurrentTheme).toBe(STORYBOOK_MODE_THEME.dark);
  });
});
