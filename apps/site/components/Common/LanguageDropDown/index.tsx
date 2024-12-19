import { LanguageIcon } from '@heroicons/react/24/outline';
import type { LocaleConfig } from '@node-core/website-i18n/types';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import styles from './index.module.css';

type SimpleLocaleConfig = Pick<LocaleConfig, 'name' | 'code' | 'localName'>;

type LanguageDropDownProps = {
  onChange?: (newLocale: SimpleLocaleConfig) => void;
  currentLanguage: string;
  availableLanguages: Array<SimpleLocaleConfig>;
};

const LanguageDropdown: FC<LanguageDropDownProps> = ({
  onChange = () => {},
  currentLanguage,
  availableLanguages,
}) => {
  const t = useTranslations();

  const ariaLabel = t('components.common.languageDropdown.label');

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
