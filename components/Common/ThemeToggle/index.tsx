import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { AccessibleIcon } from '@radix-ui/react-accessible-icon';
import type { FC } from 'react';
import { useIntl } from 'react-intl';

import styles from './index.module.css';

type ThemeToggleProps = {
  onChange: () => void;
};

const ThemeToggle: FC<ThemeToggleProps> = ({ onChange }) => {
  const intl = useIntl();

  return (
    <button
      type="button"
      onClick={onChange}
      onKeyDown={onChange}
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
