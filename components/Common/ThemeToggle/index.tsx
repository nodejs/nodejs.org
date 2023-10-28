import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { AccessibleIcon } from '@radix-ui/react-accessible-icon';
import type { FC, MouseEvent } from 'react';
import { useIntl } from 'react-intl';

import styles from './index.module.css';

type ThemeToggleProps = {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

const ThemeToggle: FC<ThemeToggleProps> = ({ onClick }) => {
  const intl = useIntl();

  return (
    <button type="button" onClick={onClick} className={styles.themeToggle}>
      <AccessibleIcon
        label={intl.formatMessage({
          id: 'components.header.buttons.toggleDarkMode',
        })}
      >
        <MoonIcon className="hidden dark:block" />
      </AccessibleIcon>
      <AccessibleIcon
        label={intl.formatMessage({
          id: 'components.header.buttons.toggleLightMode',
        })}
      >
        <SunIcon className="block dark:hidden" />
      </AccessibleIcon>
    </button>
  );
};

export default ThemeToggle;
