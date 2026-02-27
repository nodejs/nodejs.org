import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/outline';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';

import type { FC } from 'react';

import styles from './index.module.css';

export type Theme = 'system' | 'light' | 'dark';

type ThemeToggleProps = {
  onChange?: (theme: Theme) => void;
  currentTheme?: Theme;
  ariaLabel?: string;
  themeLabels?: { system: string; light: string; dark: string };
};

const themeIcons: Record<Theme, typeof SunIcon> = {
  system: ComputerDesktopIcon,
  light: SunIcon,
  dark: MoonIcon,
};

const themes: Array<Theme> = ['system', 'light', 'dark'];

const ThemeToggle: FC<ThemeToggleProps> = ({
  onChange = () => {},
  currentTheme = 'system',
  ariaLabel,
  themeLabels = { system: 'System', light: 'Light', dark: 'Dark' },
}) => {
  const TriggerIcon = themeIcons[currentTheme];

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className={styles.themeToggle}
          aria-label={ariaLabel}
        >
          <TriggerIcon height="20" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          className={styles.dropDownContent}
          sideOffset={5}
        >
          {themes.map(theme => {
            const Icon = themeIcons[theme];
            return (
              <DropdownMenu.Item
                key={theme}
                onClick={() => onChange(theme)}
                className={classNames(styles.dropDownItem, {
                  [styles.activeItem]: theme === currentTheme,
                })}
              >
                <Icon height="16" />
                {themeLabels[theme]}
              </DropdownMenu.Item>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default ThemeToggle;
