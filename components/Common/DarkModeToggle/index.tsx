import React, { useEffect } from 'react';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import BrightnessMediumIcon from '@mui/icons-material/BrightnessMedium';
import styles from './index.module.scss';
import { useTheme } from 'next-themes';

const THEME = {
  DARK: 'dark',
  LIGHT: 'light',
} as const;

function updateBodyClass(theme: string) {
  if (typeof document === 'undefined' || !theme) return;
  const checkTheme = theme === THEME.DARK ? THEME.LIGHT : THEME.DARK;
  // Remove the previous theme classname before adding
  if (document.body.classList.contains(checkTheme)) {
    document.body.classList.remove(checkTheme);
  }
  document.body.classList.add(theme);
}

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();

  const isDark = theme === 'dark';

  useEffect(() => {
    if (theme) updateBodyClass(theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggleTheme(isKeyPress?: boolean) {
    if (isKeyPress) {
      return;
    }

    const newTheme = theme === THEME.DARK ? THEME.LIGHT : THEME.DARK;
    setTheme(newTheme);
    updateBodyClass(newTheme);
  }

  return (
    <button
      type="button"
      className={styles.darkModeToggle}
      onClick={() => toggleTheme()}
      onKeyPress={() => toggleTheme(true)}
      aria-pressed={isDark}
    >
      <span className="sr-only">Toggle Dark Mode</span>
      <ModeNightIcon className="light-mode-only" />
      <BrightnessMediumIcon className="dark-mode-only" />
    </button>
  );
};

export default DarkModeToggle;
