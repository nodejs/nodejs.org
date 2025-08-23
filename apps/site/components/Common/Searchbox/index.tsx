'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { OramaCloud } from '@orama/core';
import { SearchRoot, ChatRoot, Modal } from '@orama/ui/components';
import { useSearchContext } from '@orama/ui/contexts';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { useState, type FC, type PropsWithChildren } from 'react';

import { SlidingChatPanel } from './Chat';
import styles from './index.module.css';
import { Search } from './Search';

const orama = new OramaCloud({
  projectId: '939d8d74-dbb7-4098-ac46-00325a783e17',
  apiKey: 'c1_dRV3iUW4GpJkKffpYXgCEamhWLf$_X9gfYdiVhZkVD4MCr105K0qb$BiGdg',
});

const InnerSearchBox: FC<PropsWithChildren> = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [shouldAutoTrigger, setShouldAutoTrigger] = useState(false);
  const { searchTerm } = useSearchContext();

  const toggleChatPanel = (): void => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen && searchTerm) {
      setShouldAutoTrigger(true);
    }
  };

  const handleChatOpened = (): void => {
    setTimeout(() => {
      setShouldAutoTrigger(false);
    }, 1000);
  };

  return (
    <>
      <Search onChatTrigger={toggleChatPanel} />
      <SlidingChatPanel
        open={isChatOpen}
        onClose={toggleChatPanel}
        autoTriggerQuery={shouldAutoTrigger ? searchTerm : null}
        onAutoTriggerComplete={handleChatOpened}
      />
    </>
  );
};

const SearchWithModal: FC = () => {
  const [open, setOpen] = useState(false);
  const t = useTranslations();
  const { searchTerm } = useSearchContext();

  const toggleSearchBox = (): void => {
    setOpen(!open);
  };

  return (
    <>
      <button
        type="button"
        onClick={toggleSearchBox}
        className={styles.searchButton}
      >
        <div className={styles.searchButtonContent}>
          <MagnifyingGlassIcon />
          {t('components.search.searchPlaceholder')}
        </div>
        <span className={styles.searchButtonShortcut}>⌘ K</span>
      </button>

      <Modal.Wrapper
        open={open}
        onModalClosed={toggleSearchBox}
        closeOnOutsideClick={true}
        closeOnEscape={true}
        className={classNames(styles.modalWrapper, {
          [styles.modalWrapperWithResults]: searchTerm,
        })}
      >
        <Modal.Inner className={styles.modalInner}>
          <Modal.Content className={styles.modalContent}>
            <InnerSearchBox />
          </Modal.Content>
        </Modal.Inner>
      </Modal.Wrapper>
    </>
  );
};

const OramaSearch: FC<PropsWithChildren> = () => (
  <SearchRoot client={orama}>
    <ChatRoot client={orama}>
      <SearchWithModal />
    </ChatRoot>
  </SearchRoot>
);

export default OramaSearch;
