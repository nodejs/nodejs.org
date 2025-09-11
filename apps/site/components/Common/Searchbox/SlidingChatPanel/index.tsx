'use client';

import { ArrowDownIcon, XMarkIcon } from '@heroicons/react/24/solid';
import type { Interaction } from '@orama/core';
import { ChatInteractions, SlidingPanel } from '@orama/ui/components';
import { useScrollableContainer } from '@orama/ui/hooks/useScrollableContainer';
import { useTranslations } from 'next-intl';
import type { FC, PropsWithChildren } from 'react';

import { ChatInput } from '../ChatInput';
import { ChatMessage } from '../ChatMessage';
import styles from './index.module.css';

type SlidingChatPanelProps = PropsWithChildren<{
  open: boolean;
  onClose: () => void;
  autoTriggerQuery?: string | null;
  onAutoTriggerComplete?: () => void;
}>;

export const SlidingChatPanel: FC<SlidingChatPanelProps> = ({
  open,
  onClose,
}) => {
  const t = useTranslations();
  const {
    containerRef,
    showGoToBottomButton,
    scrollToBottom,
    recalculateGoToBottomButton,
  } = useScrollableContainer();

  return (
    <>
      <SlidingPanel.Wrapper open={open} onClose={onClose}>
        <SlidingPanel.Content
          position="bottom"
          className={styles.slidingPanelContentWrapper}
        >
          <SlidingPanel.Close
            className={styles.slidingPanelCloseButton}
            aria-label={t('components.search.closeChat')}
          >
            <XMarkIcon />
          </SlidingPanel.Close>

          <div className={styles.slidingPanelInner}>
            <div
              ref={containerRef}
              className={styles.chatInteractionsContainer}
            >
              <ChatInteractions.Wrapper
                onScroll={recalculateGoToBottomButton}
                onStreaming={recalculateGoToBottomButton}
                onNewInteraction={() => scrollToBottom({ animated: true })}
                className={`${styles.chatInteractionsWrapper}`}
              >
                {(
                  interaction: Interaction,
                  index?: number,
                  totalInteractions?: number
                ) => (
                  <ChatMessage
                    interaction={interaction}
                    index={index ?? 0}
                    totalInteractions={totalInteractions ?? 1}
                  />
                )}
              </ChatInteractions.Wrapper>
            </div>
            <div className={styles.slidingPanelBottom}>
              {showGoToBottomButton && (
                <button
                  onClick={() => scrollToBottom({ animated: true })}
                  className={styles.scrollDownButton}
                  aria-label={t('components.search.scrollToBottom')}
                >
                  <ArrowDownIcon />
                </button>
              )}
              <ChatInput />
            </div>
          </div>
        </SlidingPanel.Content>
      </SlidingPanel.Wrapper>
    </>
  );
};
