import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState, type FC, useEffect } from 'react';

import { SearchBox } from '@/components/SearchBox/components/SearchBox';

import styles from './index.module.css';

export const SearchButton: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.addEventListener('keydown', event => {
      // Detect ⌘ + k on Mac, Ctrl + k on Windows
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        openSearchBox();
      }

      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    });

    return () => {
      document.removeEventListener('keydown', () => {});
    };
  }, []);

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
