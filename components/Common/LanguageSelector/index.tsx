import { useMemo, useState } from 'react';
import { MdOutlineTranslate } from 'react-icons/md';
import { useIntl } from 'react-intl';
import styles from './index.module.scss';
import Dropdown from '../Dropdown';
import { useLocale } from '../../../hooks/useLocale';

const dropdownStyle = {
  position: 'absolute',
  top: '60%',
  right: '0',
  margin: 0,
} as const;

const LanguageSelector = () => {
  const [showDropdown, setShowDropdown] = useState(false);

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
    <div className={styles.container}>
      <button
        type="button"
        className={styles.languageSwitch}
        onClick={() => setShowDropdown(!showDropdown)}
        aria-expanded={showDropdown}
        aria-label={ariaLabelText}
      >
        <MdOutlineTranslate />
      </button>

      <Dropdown
        items={dropdownItems}
        shouldShow={showDropdown}
        styles={dropdownStyle}
      />
    </div>
  );
};

export default LanguageSelector;