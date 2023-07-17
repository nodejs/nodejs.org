import { useMemo, useState, useCallback, useRef } from 'react';
import { MdOutlineTranslate } from 'react-icons/md';
import { useIntl } from 'react-intl';
import styles from './index.module.scss';
import Dropdown from '../Dropdown';
import { useLocale } from '../../../hooks/useLocale';
import { useClickOutside } from '../../../hooks/useClickOutside';

const dropdownStyle = {
  position: 'absolute',
  top: '60%',
  right: '0',
  margin: 0,
} as const;

const LanguageSelector = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownHandler = useCallback(() => setShowDropdown(false), []);
  const ref = useClickOutside<HTMLUListElement>(dropdownHandler, buttonRef);

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
    <>
      <button
        type="button"
        className={styles.languageSwitch}
        onClick={() => setShowDropdown(!showDropdown)}
        aria-expanded={showDropdown}
        aria-label={ariaLabelText}
        ref={buttonRef}
      >
        <MdOutlineTranslate />
      </button>

      <Dropdown
        items={dropdownItems}
        shouldShow={showDropdown}
        styles={dropdownStyle}
        ref={ref}
      />
    </>
  );
};

export default LanguageSelector;
