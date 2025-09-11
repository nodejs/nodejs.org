'use client';

import { MagnifyingGlassIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
import { OramaCloud } from '@orama/core';
import { SearchRoot, ChatRoot, Modal } from '@orama/ui/components';
import { useSearchContext, useChatDispatch } from '@orama/ui/contexts';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { useEffect, useState, type FC, type PropsWithChildren } from 'react';
import '@orama/ui/styles.css';

import {
  ORAMA_CLOUD_PROJECT_ID,
  ORAMA_CLOUD_READ_API_KEY,
} from '#site/next.constants.mjs';

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
}> = ({ isChatOpen, onClose, onSelect }) => (
  <div className={styles.mobileTopBar}>
    <button
      className={styles.mobileTopBarArrow}
      onClick={onClose}
      aria-label="Close"
    >
      <ArrowLeftIcon className="h-6 w-6 text-white" />
    </button>
    <div className={styles.mobileTopBarTabs}>
      <button
        className={classNames(styles.mobileTopBarTab, {
          [styles.active]: !isChatOpen,
        })}
        onClick={() => onSelect('search')}
      >
        Search
      </button>
      <button
        className={classNames(styles.mobileTopBarTab, {
          [styles.active]: isChatOpen,
        })}
        onClick={() => onSelect('chat')}
      >
        Ask AI
      </button>
    </div>
  </div>
);

const InnerSearchBox: FC<PropsWithChildren<{ onClose: () => void }>> = ({
  onClose,
}) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const dispatch = useChatDispatch();
  const [mode, setMode] = useState<'search' | 'chat'>('search');
  const [shouldAutoTrigger, setShouldAutoTrigger] = useState(false);
  const [autoTriggerValue, setAutoTriggerValue] = useState<string | null>(null);
  const { searchTerm } = useSearchContext();

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
      <div className={styles.mobileOnly}>
        <MobileTopBar
          isChatOpen={mode === 'chat'}
          onClose={onClose}
          onSelect={handleSelectMode}
        />
      </div>
      <Search
        onChatTrigger={() => {
          setAutoTriggerValue(searchTerm ?? null);
          handleSelectMode('chat');
        }}
      />
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
        className={classNames(styles.modalWrapper, {
          [styles.modalWrapperWithResults]: searchTerm,
        })}
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
    <ChatRoot client={orama}>
      <SearchWithModal />
    </ChatRoot>
  </SearchRoot>
);

export default OramaSearch;
