import React, { useEffect } from 'react';
import styles from './index.module.scss';
import { useTheme } from 'next-themes';
import { useUpdateBodyClass } from '../../../hooks/useUpdateBodyClass';
import {
  MdLightMode as IconLightMode,
  MdNightlight as IconDarkMode,
} from 'react-icons/md';

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const updateBodyClass = useUpdateBodyClass();

  const isDark = theme === 'dark';

  useEffect(() => {
    if (theme) updateBodyClass(theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleTheme = (isKeyPress?: boolean) => {
    if (isKeyPress) {
      return;
    }

    const newTheme = theme === 'dark' ? 'light' : 'dark';

    setTheme(newTheme);
    updateBodyClass(newTheme);
  };

  return (
    <button
      type="button"
      className={styles.darkModeToggle}
      onClick={() => toggleTheme()}
      onKeyPress={() => toggleTheme(true)}
      aria-pressed={isDark}
    >
      <span className="sr-only">Toggle Dark Mode</span>
      <IconDarkMode className="light-mode-only" />
      <IconLightMode className="dark-mode-only" />
    </button>
  );
};

export default DarkModeToggle;
