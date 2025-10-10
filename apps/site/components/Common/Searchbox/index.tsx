'use client';

import {
  MagnifyingGlassIcon,
  ArrowLeftIcon,
  SparklesIcon,
} from '@heroicons/react/24/solid';
import { SearchRoot, ChatRoot, Modal } from '@orama/ui/components';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import type { FC, PropsWithChildren } from 'react';
import { useEffect, useReducer, useState, useRef } from 'react';

import '@orama/ui/styles.css';

import { OramaProvider, useOrama } from '#site/providers/oramaProvider';
import searchboxReducer, {
  searchboxState,
  getActions,
} from '#site/reducers/searchboxReducer';

import { ChatInput } from './ChatInput';
import { ChatInteractionsContainer } from './ChatInteractions';
import { Footer } from './Footer';
import styles from './index.module.css';
import { Search } from './Search';
import { SlidingChatPanel } from './SlidingChatPanel';

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
  const [state, dispatch] = useReducer(searchboxReducer, searchboxState);
  const actions = getActions(dispatch);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const displaySearch =
    !isMobileScreen || (isMobileScreen && state.mode === 'search');

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
          isChatOpen={state.mode === 'chat'}
          onClose={onClose}
          onSelect={actions.switchTo}
        />
      )}
      {displaySearch && (
        <>
          <Search
            mode={state.mode}
            onChatTrigger={() => actions.switchTo('chat')}
            ref={searchInputRef}
          />
        </>
      )}
      {isMobileScreen && state.mode === 'chat' && (
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
      {!isMobileScreen && state.mode === 'chat' && (
        <SlidingChatPanel
          open={state.isChatOpen}
          onClose={() => {
            actions.closeChatAndReset(() => {
              searchInputRef.current?.focus();
            });
          }}
        />
      )}
    </>
  );
};

const SearchWithModal: FC = () => {
  const [state, dispatch] = useReducer(searchboxReducer, searchboxState);
  const actions = getActions(dispatch);
  const orama = useOrama();
  const t = useTranslations();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        actions.toggleModal();
      }
      if (e.key === 'Escape') {
        actions.closeModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [actions]);

  return (
    <div className={styles.searchboxContainer}>
      <button
        type="button"
        data-testid="orama-button"
        onClick={actions.toggleModal}
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
        open={state.isOpen}
        onModalClosed={actions.closeModal}
        closeOnOutsideClick
        closeOnEscape
        className={styles.modalWrapper}
      >
        <Modal.Inner className={styles.modalInner}>
          <Modal.Content className={styles.modalContent}>
            <InnerSearchBox onClose={actions.closeModal} />
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
        <SearchWithModal />
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
