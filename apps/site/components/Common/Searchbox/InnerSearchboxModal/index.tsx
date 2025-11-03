'use client';
import type { FC, PropsWithChildren } from 'react';
import { useEffect, useState, useRef } from 'react';

import { useSearchbox } from '#site/providers/searchboxProvider';

import { ChatInput } from '../ChatInput';
import { ChatInteractionsContainer } from '../ChatInteractions';
import { Footer } from '../Footer';
import { MobileTopBar } from '../MobileTopBar';
import { Search } from '../Search';
import { SlidingChatPanel } from '../SlidingChatPanel';
import styles from './index.module.css';

export const InnerSearchboxModal: FC<PropsWithChildren> = () => {
  const searchbox = useSearchbox();
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const displaySearch =
    !isMobileScreen || (isMobileScreen && searchbox?.mode === 'search');

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
          isChatOpen={searchbox?.mode === 'chat'}
          onSelect={searchbox?.switchTo}
        />
      )}
      {displaySearch && <Search ref={searchInputRef} />}
      {isMobileScreen && searchbox?.mode === 'chat' && (
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
      {!isMobileScreen && searchbox?.mode === 'chat' && (
        <SlidingChatPanel
          open={searchbox?.isChatOpen}
          onClose={() => {
            searchbox?.closeChatAndReset(() => {
              searchInputRef.current?.focus();
            });
          }}
        />
      )}
    </>
  );
};
