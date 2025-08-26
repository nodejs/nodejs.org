'use client';

import { MagnifyingGlassIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
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

const InnerSearchBox: FC<PropsWithChildren<{ onClose: () => void }>> = ({
  onClose,
}) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [mode, setMode] = useState<'search' | 'chat'>('search');
  const [shouldAutoTrigger, setShouldAutoTrigger] = useState(false);
  const [autoTriggerValue, setAutoTriggerValue] = useState<string | null>(null);
  const { searchTerm } = useSearchContext();

  const handleSelectMode = (newMode: 'search' | 'chat') => {
    console.debug('[handleSelectMode] newMode:', newMode);
    setMode(newMode);
    if (newMode === 'chat') {
      setIsChatOpen(true);
    }
    if (newMode === 'search') {
      setIsChatOpen(false);
    }
    setTimeout(() => {
      console.debug(
        '[handleSelectMode] mode:',
        mode,
        'isChatOpen:',
        isChatOpen
      );
    }, 0);
  };

  const handleChatOpened = (): void => {
    console.debug('[handleChatOpened] called');
    setTimeout(() => {
      setShouldAutoTrigger(false);
      setAutoTriggerValue(null);
      console.debug(
        '[handleChatOpened] shouldAutoTrigger set to false, autoTriggerValue cleared'
      );
    }, 1000);
  };

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
        <ArrowLeftIcon style={{ color: '#fff', width: 24, height: 24 }} />
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

  return (
    <>
      {/* Only show on mobile */}
      <div className={styles.mobileOnly}>
        <MobileTopBar
          isChatOpen={mode === 'chat'}
          onClose={onClose}
          onSelect={handleSelectMode}
        />
      </div>
      {mode === 'search' && (
        <Search
          onChatTrigger={() => {
            setAutoTriggerValue(searchTerm ?? null); // capture the current search term safely
            setShouldAutoTrigger(true);
            console.debug(
              '[onChatTrigger] shouldAutoTrigger set to true, searchTerm:',
              searchTerm
            );
            handleSelectMode('chat');
          }}
        />
      )}
      {mode === 'chat' && (
        <>
          <SlidingChatPanel
            open={isChatOpen}
            onClose={() => {
              setIsChatOpen(false);
              setMode('search'); // Switch back to search mode on desktop when chat closes
            }}
            autoTriggerQuery={shouldAutoTrigger ? autoTriggerValue : null}
            onAutoTriggerComplete={handleChatOpened}
          />
        </>
      )}
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
