'use client';

import {
  MagnifyingGlassIcon,
  ArrowLeftIcon,
  SparklesIcon,
} from '@heroicons/react/24/solid';
import { OramaCloud } from '@orama/core';
import { SearchRoot, ChatRoot, Modal } from '@orama/ui/components';
import { useSearchContext, useChatDispatch } from '@orama/ui/contexts';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import type { FC, PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';

import {
  ORAMA_CLOUD_PROJECT_ID,
  ORAMA_CLOUD_READ_API_KEY,
} from '#site/next.constants.mjs';

import '@orama/ui/styles.css';

import { ChatInput } from './ChatInput';
import { ChatInteractionsContainer } from './ChatInteractions';
import { Footer } from './Footer';
import styles from './index.module.css';
import { Search } from './Search';
import { SlidingChatPanel } from './SlidingChatPanel';

const orama = new OramaCloud({
  projectId: ORAMA_CLOUD_PROJECT_ID,
  apiKey: ORAMA_CLOUD_READ_API_KEY,
});

const MobileTopBar: FC<{
  isChatOpen: boolean;
  onClose: () => void;
  onSelect: (mode: 'search' | 'chat') => void;
}> = ({ isChatOpen, onClose, onSelect }) => {
  const [animated, setAnimated] = useState(false);

  function selectMode(mode: 'search' | 'chat') {
    onSelect(mode);

    if (!animated) {
      setAnimated(true);
    }
  }

  return (
    <div className={styles.topBar}>
      <button
        className={styles.topBarArrow}
        onClick={onClose}
        aria-label="Close"
      >
        <ArrowLeftIcon />
      </button>
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

const InnerSearchBox: FC<PropsWithChildren<{ onClose: () => void }>> = ({
  onClose,
}) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const dispatch = useChatDispatch();
  const [mode, setMode] = useState<'search' | 'chat'>('search');
  const [shouldAutoTrigger, setShouldAutoTrigger] = useState(false);
  const [autoTriggerValue, setAutoTriggerValue] = useState<string | null>(null);
  const { searchTerm } = useSearchContext();
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  const displaySearch =
    !isMobileScreen || (isMobileScreen && mode === 'search');

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

  const handleSelectMode = (newMode: 'search' | 'chat') => {
    setMode(newMode);
    if (newMode === 'chat') {
      setIsChatOpen(true);
    }
    if (newMode === 'search') {
      setIsChatOpen(false);
    }
  };

  const handleChatOpened = (): void => {
    setTimeout(() => {
      setShouldAutoTrigger(false);
      setAutoTriggerValue(null);
    }, 1000);
  };

  return (
    <>
      {isMobileScreen && (
        <MobileTopBar
          isChatOpen={mode === 'chat'}
          onClose={onClose}
          onSelect={handleSelectMode}
        />
      )}
      {displaySearch && (
        <Search
          onChatTrigger={() => {
            setAutoTriggerValue(searchTerm ?? null);
            handleSelectMode('chat');
          }}
        />
      )}
      {isMobileScreen && mode === 'chat' && (
        <div className={styles.mobileChatContainer}>
          <div className={styles.mobileChatTop}>
            <ChatInteractionsContainer />
          </div>
          <div className={styles.mobileChatBottom}>
            <ChatInput />
          </div>
        </div>
      )}
      <Footer />
      {!isMobileScreen && (
        <SlidingChatPanel
          open={isChatOpen}
          onClose={() => {
            setIsChatOpen(false);
            setMode('search');
            dispatch({ type: 'CLEAR_INTERACTIONS' });
            dispatch({ type: 'CLEAR_USER_PROMPT' });
          }}
          autoTriggerQuery={shouldAutoTrigger ? autoTriggerValue : null}
          onAutoTriggerComplete={handleChatOpened}
        />
      )}
    </>
  );
};

const SearchWithModal: FC = () => {
  const [open, setOpen] = useState(false);
  const t = useTranslations();

  const toggleSearchBox = (): void => {
    setOpen(!open);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(open => !open);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className={styles.searchboxContainer}>
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
        onModalClosed={() => setOpen(false)}
        closeOnOutsideClick={true}
        closeOnEscape={true}
        className={styles.modalWrapper}
      >
        <Modal.Inner className={styles.modalInner}>
          <Modal.Content className={styles.modalContent}>
            <InnerSearchBox onClose={() => setOpen(false)} />
          </Modal.Content>
        </Modal.Inner>
      </Modal.Wrapper>
    </div>
  );
};

const OramaSearch: FC<PropsWithChildren> = () => (
  <SearchRoot client={orama}>
    <ChatRoot
      client={orama}
      askOptions={{ throttle_delay: 50 }}
      onAskStart={options => console.log('Starting:', options)}
    >
      <SearchWithModal />
    </ChatRoot>
  </SearchRoot>
);

export default OramaSearch;
