'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState, type FC } from 'react';

import { SearchBox } from '@/components/SearchBox/components/SearchBox';
import { useKeyboardCommands } from '@/components/SearchBox/lib/useKeyboardCommands';

import styles from './index.module.css';

export const SearchButton: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

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

  function openSearchBox() {
    setIsOpen(true);
  }

  function closeSearchBox() {
    setIsOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={openSearchBox}
        className={styles.searchButton}
      >
        <MagnifyingGlassIcon className={styles.magnifyingGlassIcon} />
        Start typing...
      </button>
      {isOpen && <SearchBox onClose={closeSearchBox} />}
    </>
  );
};
