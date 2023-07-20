import { useMemo, useState } from 'react';
import { MdOutlineTranslate } from 'react-icons/md';
import { useIntl } from 'react-intl';
import styles from './index.module.scss';
import Dropdown from '@/components/Common/Dropdown';
import { useLocale } from '@/hooks/useLocale';
import { useClickOutside } from '@/hooks/useClickOutside';

const dropdownStyle = {
  position: 'absolute',
  top: '60%',
  right: '0',
  margin: 0,
} as const;

const LanguageSelector = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const ref = useClickOutside<HTMLUListElement>(
    () => showDropdown && setShowDropdown(false)
  );

  const { availableLocales, currentLocale } = useLocale();

  const intl = useIntl();

  const dropdownItems = useMemo(
    () =>
      availableLocales.map(locale => ({
        title: locale.localName,
        label: locale.name,
        onClick: () => {
          // TODO: "locale changing logic yet to be implemented"
        },
        active: currentLocale.code === locale.code,
      })),
    [availableLocales, currentLocale]
  );

  const ariaLabelText = intl.formatMessage({
    id: 'components.common.languageSelector.button.title',
  });

  return (
    <Dropdown
      items={dropdownItems}
      shouldShow={showDropdown}
      styles={dropdownStyle}
      ref={ref}
    >
      <button
        type="button"
        className={styles.languageSwitch}
        onClick={event => {
          event.stopPropagation();

          setShowDropdown(!showDropdown);
        }}
        aria-expanded={showDropdown}
        aria-label={ariaLabelText}
      >
        <MdOutlineTranslate />
      </button>
    </Dropdown>
  );
};

export default LanguageSelector;
