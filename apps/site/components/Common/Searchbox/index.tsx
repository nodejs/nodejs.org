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
  projectId: 'af3273af-bc7b-403a-84cf-10cc0a18b3e3',
  apiKey: 'c1_El0nYP-1o8B1VcdS-q73ZLpNlx_QRf98gjzGH1hYq_hPqh_qS7$TwrkfGVy',
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
