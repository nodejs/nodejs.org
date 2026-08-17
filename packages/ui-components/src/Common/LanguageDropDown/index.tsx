import { LanguageIcon } from '@heroicons/react/24/outline';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';

import type { SimpleLocaleConfig } from '#ui/types';
import type { FC } from 'react';

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
            {availableLanguages.map(({ name, code, localName, hrefLang }) => (
              <DropdownMenu.Item
                key={code}
                aria-label={name}
                onClick={() => onChange({ name, code, localName, hrefLang })}
                className={classNames(styles.dropDownItem, {
                  [styles.currentDropDown]: code === currentLanguage,
                })}
              >
                <span lang={hrefLang} aria-hidden="true">
                  {localName}
                </span>
              </DropdownMenu.Item>
            ))}
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default LanguageDropdown;
