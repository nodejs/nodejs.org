import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import type { FC, ButtonHTMLAttributes } from 'react';

import styles from './index.module.css';

const ThemeToggle: FC<ButtonHTMLAttributes<HTMLButtonElement>> = props => {
  return (
    <button type="button" className={styles.themeToggle} {...props}>
      <MoonIcon className="block dark:hidden" height="20" />
      <SunIcon className="hidden dark:block" height="20" />
    </button>
  );
};

export default ThemeToggle;
