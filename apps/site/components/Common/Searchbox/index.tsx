'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { SearchRoot, ChatRoot, Modal } from '@orama/ui/components';
import { useTranslations } from 'next-intl';
import type { FC, PropsWithChildren } from 'react';
import { useEffect, useState, useRef } from 'react';

import '@orama/ui/styles.css';

import { OramaProvider, useOrama } from '#site/providers/oramaProvider';
import {
  SearchboxProvider,
  useSearchbox,
} from '#site/providers/searchboxProvider';

import { ChatInput } from './ChatInput';
import { ChatInteractionsContainer } from './ChatInteractions';
import { Footer } from './Footer';
import styles from './index.module.css';
import { MobileTopBar } from './MobileTopBar';
import { Search } from './Search';
import { SlidingChatPanel } from './SlidingChatPanel';

const InnerSearchboxModal: FC<PropsWithChildren<{ onClose: () => void }>> = ({
  onClose,
}) => {
  const searchbox = useSearchbox();
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const displaySearch =
    !isMobileScreen || (isMobileScreen && searchbox.mode === 'search');

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileScreen(window.innerWidth < 1024);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  return (
    <>
      {isMobileScreen && (
        <MobileTopBar
          isChatOpen={searchbox.mode === 'chat'}
          onClose={onClose}
          onSelect={searchbox.switchTo}
        />
      )}
      {displaySearch && <Search ref={searchInputRef} />}
      {isMobileScreen && searchbox.mode === 'chat' && (
        <>
          <div className={styles.mobileChatContainer}>
            <div className={styles.mobileChatTop}>
              <ChatInteractionsContainer />
            </div>
            <div className={styles.mobileChatBottom}>
              <ChatInput />
            </div>
          </div>
          <Footer />
        </>
      )}
      {!isMobileScreen && searchbox.mode === 'chat' && (
        <SlidingChatPanel
          open={searchbox.isChatOpen}
          onClose={() => {
            searchbox.closeChatAndReset(() => {
              searchInputRef.current?.focus();
            });
          }}
        />
      )}
    </>
  );
};

const Searchbox: FC = () => {
  const searchbox = useSearchbox();
  const orama = useOrama();
  const t = useTranslations();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchbox.toggleModal();
      }
      if (e.key === 'Escape') {
        searchbox.closeModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [searchbox]);

  return (
    <div className={styles.searchboxContainer}>
      <button
        type="button"
        data-testid="orama-button"
        onClick={searchbox.toggleModal}
        disabled={!orama}
        className={styles.searchButton}
      >
        <div className={styles.searchButtonContent}>
          <MagnifyingGlassIcon />
          {t('components.search.searchPlaceholder')}
        </div>
        <span className={styles.searchButtonShortcut}>⌘ K</span>
      </button>

      <Modal.Wrapper
        open={searchbox.isOpen}
        onModalClosed={searchbox.closeModal}
        closeOnOutsideClick
        closeOnEscape
        className={styles.modalWrapper}
      >
        <Modal.Inner className={styles.modalInner}>
          <Modal.Content className={styles.modalContent}>
            <InnerSearchboxModal onClose={searchbox.closeModal} />
          </Modal.Content>
        </Modal.Inner>
      </Modal.Wrapper>
    </div>
  );
};

const OramaSearch: FC<PropsWithChildren> = () => {
  const orama = useOrama();

  return (
    <SearchRoot client={orama}>
      <ChatRoot client={orama} askOptions={{ throttle_delay: 50 }}>
        <SearchboxProvider>
          <Searchbox />
        </SearchboxProvider>
      </ChatRoot>
    </SearchRoot>
  );
};

const OramaSearchWrapper = () => {
  return (
    <OramaProvider>
      <OramaSearch />
    </OramaProvider>
  );
};

export default OramaSearchWrapper;
