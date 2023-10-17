import { LanguageIcon } from '@heroicons/react/24/outline';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import type { FC } from 'react';
import { useIntl } from 'react-intl';

import { useLocale } from '@/hooks/useLocale';

import styles from './index.module.css';

export type LanguageDropDownProps = {
  onClick?: () => void;
};

const LanguageDropdown: FC<LanguageDropDownProps> = ({
  onClick = () => {},
}) => {
  const { availableLocales, currentLocale } = useLocale();
  const intl = useIntl();

  const ariaLabel = intl.formatMessage({
    id: 'components.common.languageDropdown.label',
  });

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className={styles.iconWrapper} aria-label={ariaLabel}>
          <LanguageIcon height="20" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          className={styles.dropDownContent}
          sideOffset={5}
        >
          {availableLocales.map(({ name, code }) => (
            <DropdownMenu.Item
              key={code}
              onClick={onClick}
              className={classNames(styles.dropDownItem, {
                [styles.currentDropDown]: code === currentLocale.code,
              })}
            >
              {name}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default LanguageDropdown;
