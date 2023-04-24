import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, fireEvent, screen } from '@testing-library/react';
import Header from '..';
import { useMediaQuery } from '../../../hooks/useMediaQuery';

let mockCurrentTheme = 'dark';

const mockToggleTheme = jest.fn().mockImplementation((newTheme: string) => {
  mockCurrentTheme = newTheme === 'light' ? 'dark' : 'light';
});

// mock dark mode module for controlling dark mode HOC behavior
jest.mock('@skagami/gatsby-plugin-dark-mode', () => ({
  __esModule: true,
  useTheme: () => [mockCurrentTheme, mockToggleTheme],
}));

// mock useMediaQuery hook for emulating mobile device
jest.mock('../../../hooks/useMediaQuery', () => ({
  useMediaQuery: jest.fn(),
}));

describe('Tests for Header component', () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useMediaQuery.mockReturnValue(false);
  });

  afterEach(() => {
    mockToggleTheme.mockClear();
    mockCurrentTheme = 'dark';
  });

  it('renders correctly', () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });

  it('renders shorter menu items for mobile', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useMediaQuery.mockReturnValue(true);
    const { container } = render(<Header />);

    expect(container).toMatchSnapshot();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useMediaQuery.mockClear();
  });

  describe('Theme color switcher', () => {
    it('switches color theme to dark', async () => {
      render(<Header />);
      const toggle = await screen.findByText('Toggle Dark Mode');
      await userEvent.click(toggle);
    });

    it('switches color theme to light', async () => {
      render(<Header />);
      const toggle = await screen.findByText('Toggle Dark Mode');
      await userEvent.click(toggle);
    });

    it('ignore key presses on color switcher', async () => {
      render(<Header />);
      const toggler = screen.getByText('Toggle Dark Mode');

      fireEvent.keyPress(toggler, { key: 'Enter', code: 13, charCode: 13 });

      expect(mockToggleTheme).toHaveBeenCalledTimes(0);
    });

    it('skips rendering in case no theme value was provided from plugin', () => {
      const { container } = render(<Header />);
      expect(container).toMatchSnapshot();
    });
  });
});