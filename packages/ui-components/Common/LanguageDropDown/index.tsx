import { LanguageIcon } from '@heroicons/react/24/outline';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import type { FC } from 'react';

import type { SimpleLocaleConfig } from '@node-core/ui-components/types';

import styles from './index.module.css';

type LanguageDropDownProps = {
  onChange?: (newLocale: SimpleLocaleConfig) => void;
  currentLanguage: string;
  availableLanguages: Array<SimpleLocaleConfig>;
  ariaLabel: string;
};

const LanguageDropdown: FC<LanguageDropDownProps> = ({
  onChange = () => {},
  currentLanguage,
  availableLanguages,
  ariaLabel,
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className={styles.languageDropdown} aria-label={ariaLabel}>
          <LanguageIcon height="20" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          className={styles.dropDownContent}
          sideOffset={5}
        >
          <div>
            {availableLanguages.map(({ name, code, localName }) => (
              <DropdownMenu.Item
                key={code}
                onClick={() => onChange({ name, code, localName })}
                className={classNames(styles.dropDownItem, {
                  [styles.currentDropDown]: code === currentLanguage,
                })}
              >
                {localName}
              </DropdownMenu.Item>
            ))}
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default LanguageDropdown;
