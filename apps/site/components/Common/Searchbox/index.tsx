'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { CollectionManager } from '@orama/core';
import { SearchRoot, ChatRoot, Modal } from '@orama/ui/components';
import { useTranslations } from 'next-intl';
import { useState, type FC, type PropsWithChildren } from 'react';

import { SlidingChatPanel } from './Chat';
import styles from './index.module.css';
import { Search } from './Search';

const oramaClient = new CollectionManager({
  url: 'https://atlantis.cluster.staging.oramacore.com',
  collectionID: 'dpygf82gs9bvtf6o85fjuj40',
  readAPIKey: '2pj8SUaPGbakScglDBHfJbV5aIuWmT7y',
});

const InnerSearchBox: FC<PropsWithChildren> = () => {
  const [displayChat, setDisplayChat] = useState(false);

  return (
    <>
      <Search onChatTrigger={() => setDisplayChat(true)} />
      <SlidingChatPanel
        open={displayChat}
        onClose={() => setDisplayChat(false)}
      />
    </>
  );
};

const OramaSearch: FC<PropsWithChildren> = () => {
  const [open, setOpen] = useState(false);
  const t = useTranslations();

  const openSearchBox = (): void => {
    setOpen(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={openSearchBox}
        className={styles.searchButton}
      >
        <div className={styles.searchButtonContent}>
          <MagnifyingGlassIcon className="h-4 w-4" />
          {t('components.search.searchPlaceholder')}
        </div>
        <span className={styles.searchButtonShortcut}>⌘ K</span>
      </button>

      <Modal.Wrapper
        open={open}
        onModalClosed={() => setOpen(false)}
        closeOnOutsideClick={true}
        closeOnEscape={true}
        className={styles.modalWrapper}
      >
        <Modal.Inner className={styles.modalInner}>
          <Modal.Content className={styles.modalContent}>
            <SearchRoot client={oramaClient}>
              <ChatRoot client={oramaClient}>
                <InnerSearchBox />
              </ChatRoot>
            </SearchRoot>
          </Modal.Content>
        </Modal.Inner>
      </Modal.Wrapper>
    </>
  );
};

export default OramaSearch;
