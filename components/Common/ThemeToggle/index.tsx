import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import type { FC, MouseEvent } from 'react';
import { useIntl } from 'react-intl';

import styles from './index.module.css';

type ThemeToggleProps = {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

const ThemeToggle: FC<ThemeToggleProps> = ({ onClick = () => {} }) => {
  const { formatMessage } = useIntl();

  const ariaLabel = formatMessage({
    id: 'components.header.buttons.toggleDarkMode',
  });

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
