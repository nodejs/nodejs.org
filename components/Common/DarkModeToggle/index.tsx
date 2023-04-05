import React from 'react';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import BrightnessMediumIcon from '@mui/icons-material/BrightnessMedium';
import styles from './index.module.scss';
import { useTheme } from './useTheme';

const DarkModeToggle = () => {
  const [theme, toggleTheme] = useTheme();

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className={styles.darkModeToggle}
      onClick={() => {
        toggleTheme?.();
      }}
      onKeyPress={() => toggleTheme?.(true)}
      aria-pressed={isDark}
    >
      <span className="sr-only">Toggle Dark Mode</span>
      <ModeNightIcon className="light-mode-only" />
      <BrightnessMediumIcon className="dark-mode-only" />
    </button>
  );
};

export default DarkModeToggle;
