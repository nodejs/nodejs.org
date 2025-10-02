'use client';

import { ArrowDownIcon } from '@heroicons/react/24/solid';
import type { Interaction } from '@orama/core';
import { ChatInteractions } from '@orama/ui/components';
import { useScrollableContainer } from '@orama/ui/hooks/useScrollableContainer';
import { useTranslations } from 'next-intl';

import { ChatMessage } from '../ChatMessage';
import styles from './index.module.css';

export const ChatInteractionsContainer = () => {
  const t = useTranslations();
  const {
    containerRef,
    scrollToBottom,
    recalculateGoToBottomButton,
    showGoToBottomButton,
  } = useScrollableContainer();

  return (
    <>
      <div ref={containerRef} className={styles.chatInteractionsContainer}>
        <ChatInteractions.Wrapper
          onScroll={recalculateGoToBottomButton}
          onStreaming={recalculateGoToBottomButton}
          onNewInteraction={() => scrollToBottom({ animated: true })}
          className={styles.chatInteractionsWrapper}
        >
          {(interaction: Interaction) => (
            <ChatMessage interaction={interaction} />
          )}
        </ChatInteractions.Wrapper>
      </div>
      {showGoToBottomButton && (
        <button
          onClick={() => scrollToBottom({ animated: true })}
          className={styles.scrollDownButton}
          aria-label={t('components.search.scrollToBottom')}
        >
          <ArrowDownIcon />
        </button>
      )}
    </>
  );
};
