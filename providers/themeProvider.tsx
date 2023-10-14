import { ThemeProvider as NextThemeProvider, useTheme } from 'next-themes';
import type { FC, PropsWithChildren } from 'react';
import { useEffect } from 'react';

const ThemeButtonListener = () => {
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    const darkThemeSwitcherElement = document.querySelector(
      '.dark-theme-switcher'
    );
    if (!darkThemeSwitcherElement) {
      return;
    }
    const callback = () => {
      setTheme(theme === 'light' ? 'dark' : 'light');
    };
    darkThemeSwitcherElement.addEventListener('click', callback);
    return () => {
      darkThemeSwitcherElement.removeEventListener('click', callback);
    };
  }, [theme, setTheme]);
  return null;
};

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => (
  <>
    <NextThemeProvider
      storageKey="theme"
      enableSystem={true}
      enableColorScheme={true}
    >
      <ThemeButtonListener />
      {children}
    </NextThemeProvider>
  </>
);
