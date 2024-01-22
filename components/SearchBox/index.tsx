'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import { useState, type FC } from 'react';

import { SearchBox } from '@/components/SearchBox/components/SearchBox';
import { useKeyboardCommands } from '@/hooks/react-client/useKeyboardCommands';

import styles from './index.module.css';

export const SearchButton: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();

  useKeyboardCommands(cmd => {
    switch (cmd) {
      case 'cmd-k':
        openSearchBox();
        break;
      case 'escape':
        closeSearchBox();
        break;
      default:
    }
  });

  const openSearchBox = () => {
    setIsOpen(true);
  };

  const closeSearchBox = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={openSearchBox}
        className={styles.searchButton}
      >
        <MagnifyingGlassIcon className={styles.magnifyingGlassIcon} />
        {t('components.search.searchBox.placeholder')}
      </button>
      {isOpen ? <SearchBox onClose={closeSearchBox} /> : null}
    </>
  );
};
