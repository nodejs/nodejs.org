import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import type { FC, MouseEvent } from 'react';

import styles from './index.module.css';

type ThemeToggleProps = {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

const ThemeToggle: FC<ThemeToggleProps> = ({ onClick = () => {} }) => {
  const t = useTranslations();

  const ariaLabel = t('components.header.buttons.toggleTheme');

  return (
    <button
      type="button"
      onClick={onClick}
      className={styles.themeToggle}
      aria-label={ariaLabel}
    >
      <MoonIcon className="block dark:hidden" height="20" />
      <SunIcon className="hidden dark:block" height="20" />
    </button>
  );
};

export default ThemeToggle;
