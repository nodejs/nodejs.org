import { LanguageIcon } from '@heroicons/react/24/outline';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import type { FC } from 'react';
import { useIntl } from 'react-intl';

import type { LocaleConfig } from '@/types';

import styles from './index.module.css';

type SimpleLocaleConfig = Pick<LocaleConfig, 'name' | 'code'>;

type LanguageDropDownProps = {
  onChange?: (newLocale: SimpleLocaleConfig) => void;
  currentLanguage: SimpleLocaleConfig;
  availableLanguages: SimpleLocaleConfig[];
};

const LanguageDropdown: FC<LanguageDropDownProps> = ({
  onChange = () => {},
  currentLanguage,
  availableLanguages,
}) => {
  const { formatMessage } = useIntl();

  const ariaLabel = formatMessage({
    id: 'components.common.languageDropdown.label',
  });

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
            {availableLanguages.map(({ name, code }) => (
              <DropdownMenu.Item
                key={code}
                onClick={() => onChange({ name, code })}
                className={classNames(styles.dropDownItem, {
                  [styles.currentDropDown]: code === currentLanguage.code,
                })}
              >
                {name}
              </DropdownMenu.Item>
            ))}
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default LanguageDropdown;
