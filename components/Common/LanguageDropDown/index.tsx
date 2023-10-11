import { LanguageIcon } from '@heroicons/react/24/outline';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useIntl } from 'react-intl';

import { useLocale } from '@/hooks/useLocale';

import styles from './index.module.css';

const DropdownMenuDemo = () => {
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
              key={name + code}
              onClick={() => {}}
              className={[
                styles.dropDownItem,
                code === currentLocale.code && styles.currentDropDown,
              ].join(' ')}
            >
              <span className="text-sm">{name}</span>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropdownMenuDemo;
