import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { AccessibleIcon } from '@radix-ui/react-accessible-icon';
import { useTheme } from 'next-themes';
import type { FC } from 'react';
import { useIntl } from 'react-intl';

import styles from './index.module.css';

const ThemeToggle: FC = () => {
  const intl = useIntl();
  const { theme, setTheme } = useTheme();

  const isDark = theme === 'dark';

  const toggleTheme = () => setTheme(isDark ? 'light' : 'dark');

  return (
    <button
      type="button"
      onClick={toggleTheme}
      onKeyDown={toggleTheme}
      className={styles.themeToggle}
    >
      <AccessibleIcon
        label={intl.formatMessage({
          id: 'components.header.buttons.toggleDarkMode',
        })}
      >
        <>
          <SunIcon className="block dark:hidden" />
          <MoonIcon className="hidden dark:block" />
        </>
      </AccessibleIcon>
    </button>
  );
};

export default ThemeToggle;
