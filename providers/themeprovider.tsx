import React, { createContext, useEffect, useState } from 'react';

// eslint-disable-next-line no-unused-vars
type ThemeContextType = [ThemeType, (k?: boolean) => void];

export const ThemeContext = createContext<undefined | ThemeContextType>(
  undefined
);

const THEME = {
  DARK: 'dark',
  LIGHT: 'light',
} as const;

type ThemeType = 'light' | 'dark';

function updateColorScheme(theme: ThemeType | null) {
  if (typeof document !== 'undefined' && document.documentElement && theme) {
    document.documentElement.style.colorScheme = theme;
  }
}

function updateBodyClass(theme: ThemeType | null) {
  if (!theme) return;
  const checkTheme = theme === THEME.DARK ? THEME.LIGHT : THEME.DARK;
  // Remove the previous theme classname before adding
  if (document.body.classList.contains(checkTheme)) {
    document.body.classList.remove(checkTheme);
  }
  document.body.classList.add(theme);
}

export const ThemeProvider = ({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element => {
  const [theme, setTheme] = useState<'light' | 'dark'>(THEME.DARK);

  useEffect(() => {
    updateColorScheme(theme);
    updateBodyClass(theme);
  }, []);

  function toggleTheme(isKeyPress?: boolean) {
    if (isKeyPress) {
      return;
    }

    const newTheme = theme === THEME.DARK ? THEME.LIGHT : THEME.DARK;
    setTheme(newTheme);
    updateColorScheme(newTheme);
    updateBodyClass(newTheme);
  }

  return (
    <ThemeContext.Provider value={[theme, toggleTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};
