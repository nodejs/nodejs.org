import { LanguageIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import type { FC } from 'react';

import Dropdown from '#ui/Common/Dropdown';
import type { SimpleLocaleConfig } from '#ui/types';

import styles from './index.module.css';

type LanguageDropDownProps = {
  onChange?: (newLocale: SimpleLocaleConfig) => void;
  currentLanguage: string;
  availableLanguages: Array<SimpleLocaleConfig>;
};

const LanguageDropdown: FC<LanguageDropDownProps> = ({
  onChange = () => {},
  currentLanguage,
  availableLanguages,
  ...props
}) => {
  return (
    <Dropdown
      values={availableLanguages.map(({ name, code, localName }) => ({
        onClick: () => onChange({ name, code, localName }),
        children: localName,
        key: code,
        className: classNames({
          'cursor-pointer': true,
          [styles.selected]: currentLanguage === code,
        }),
      }))}
      className={styles.languageDropdown}
      {...props}
    >
      <LanguageIcon height="20" />
    </Dropdown>
  );
};

export default LanguageDropdown;
