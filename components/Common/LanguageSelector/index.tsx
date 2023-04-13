import { Translate } from '@mui/icons-material';
import { useMemo, useState } from 'react';
import { useLocale } from '../../../hooks/useLocale';
import Dropdown from '../Dropdown';
import styles from './index.module.scss';

const dropdownStyle = {
  position: 'absolute',
  top: '60%',
  right: '0',
  margin: 0,
};

const LanguageSelector = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const { availableLocales, currentLocale } = useLocale();

  const dropdownItems = useMemo(
    () =>
      availableLocales.map(locale => ({
        title: locale.localName,
        label: locale.name,
        onClick: () => {},
        active: currentLocale.code === locale.code,
      })),
    [availableLocales, currentLocale]
  );

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.languageSwitch}
        onClick={() => {
          setShowDropdown(!showDropdown);
        }}
        aria-expanded={showDropdown}
      >
        <span className="sr-only">Switch Language</span>
        <Translate />
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
