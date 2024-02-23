'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import { useState, type FC } from 'react';

import { WithSearchBox } from '@/components/Common/Search/States/WithSearchBox';
import { useKeyboardCommands } from '@/hooks/react-client';

import styles from './index.module.css';

export const SearchButton: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();
  const openSearchBox = () => setIsOpen(true);
  const closeSearchBox = () => setIsOpen(false);

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
      {isOpen ? <WithSearchBox onClose={closeSearchBox} /> : null}
    </>
  );
};
