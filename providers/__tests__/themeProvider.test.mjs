import { render } from '@testing-library/react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';

import { ThemeProvider } from '@/providers/themeProvider';

jest.mock('next-themes', () => ({
  ThemeProvider: jest.fn(({ children }) => children),
}));

describe('ThemeProvider', () => {
  it('renders NextThemeProvider with the correct props', () => {
    const { container } = render(
      <ThemeProvider>
        <div>Mock Component</div>
      </ThemeProvider>
    );

    expect(NextThemeProvider).toHaveBeenCalledWith(
      {
        attribute: 'data-theme',
        defaultTheme: 'system',
        enableSystem: true,
        storageKey: 'theme',
        children: <div>Mock Component</div>,
      },
      expect.any(Object)
    );
    expect(container.firstChild).toHaveTextContent('Mock Component');
  });
});
