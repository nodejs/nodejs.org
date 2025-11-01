'use client';

import {
  MagnifyingGlassIcon,
  ArrowLeftIcon,
  SparklesIcon,
} from '@heroicons/react/24/solid';
import { Modal } from '@orama/ui/components/Modal';
import classNames from 'classnames';
import type { FC } from 'react';
import { useState } from 'react';

import '@orama/ui/styles.css';

import styles from './index.module.css';

export const MobileTopBar: FC<{
  isChatOpen: boolean;
  onSelect?: (mode: 'search' | 'chat') => void;
}> = ({ isChatOpen, onSelect }) => {
  const [animated, setAnimated] = useState(false);

  function selectMode(mode: 'search' | 'chat') {
    onSelect?.(mode);

    if (!animated) {
      setAnimated(true);
    }
  }

  return (
    <div className={styles.topBar}>
      <Modal.Close
        className={styles.topBarArrow}
        aria-label="Close search modal"
      >
        <ArrowLeftIcon />
      </Modal.Close>
      <div className={styles.topBarTabs}>
        <button
          className={classNames(styles.topBarTab, {
            [styles.topBarTabActive]: !isChatOpen,
            [styles.topBarTabAnimated]: animated,
          })}
          onClick={() => selectMode('search')}
        >
          <span>Search</span>
          <MagnifyingGlassIcon />
        </button>
        <button
          className={classNames(styles.topBarTab, {
            [styles.topBarTabActive]: isChatOpen,
            [styles.topBarTabAnimated]: animated,
          })}
          onClick={() => selectMode('chat')}
        >
          <SparklesIcon />
          <span>Ask AI</span>
        </button>
      </div>
    </div>
  );
};
