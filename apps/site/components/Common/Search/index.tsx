'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { useState, type FC } from 'react';

import { WithSearchBox } from '@/components/Common/Search/States/WithSearchBox';
import { useDetectOS } from '@/hooks';
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

  const { os } = useDetectOS();

  const osCommandKey = os === 'MAC' ? '⌘' : 'Ctrl';
  const isOSLoading = os === 'LOADING';

  return (
    <>
      <button
        type="button"
        onClick={openSearchBox}
        className={styles.searchButton}
        aria-label={t('components.search.searchBox.placeholder')}
      >
        <MagnifyingGlassIcon className={styles.magnifyingGlassIcon} />

        {t('components.search.searchBox.placeholder')}
        <kbd
          title={`${osCommandKey} K`}
          className={classNames(styles.shortcutIndicator, {
            'opacity-0': isOSLoading,
          })}
        >
          <abbr>{osCommandKey} K</abbr>
        </kbd>
      </button>

      {isOpen ? <WithSearchBox onClose={closeSearchBox} /> : null}
    </>
  );
};
