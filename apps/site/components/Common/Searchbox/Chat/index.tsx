'use client';

import { ArrowDownIcon, XMarkIcon } from '@heroicons/react/24/solid';
import type { Interaction } from '@orama/core';
import { ChatInteractions, SlidingPanel } from '@orama/ui/components';
import { useChatDispatch } from '@orama/ui/contexts';
import { useScrollableContainer } from '@orama/ui/hooks/useScrollableContainer';
import { useTranslations } from 'next-intl';
import type { FC, PropsWithChildren } from 'react';
import { useEffect } from 'react';

import { ChatInput } from './ChatInput';
import { ChatMessage } from './ChatMessage';
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
  autoTriggerQuery,
  onAutoTriggerComplete,
}) => {
  const t = useTranslations();
  const {
    containerRef,
    showGoToBottomButton,
    scrollToBottom,
    recalculateGoToBottomButton,
  } = useScrollableContainer();
  const dispatch = useChatDispatch();

  useEffect(() => {
    if (open && autoTriggerQuery && dispatch) {
      const timer = setTimeout(() => {
        dispatch({
          type: 'SET_USER_PROMPT',
          payload: {
            userPrompt: autoTriggerQuery,
          },
        });

        setTimeout(() => {
          const submitButton = document.querySelector(
            '.orama-custom-button'
          ) as HTMLButtonElement;
          if (submitButton && !submitButton.disabled) {
            submitButton.click();
          }

          onAutoTriggerComplete?.();
        }, 300);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [open, autoTriggerQuery, onAutoTriggerComplete, dispatch]);

  return (
    <>
      <SlidingPanel.Wrapper
        open={open}
        onClose={onClose}
        data-sliding-panel="true"
        className={styles.slidingPanelWrapper}
      >
        <SlidingPanel.Backdrop className={styles.slidingPanelBackdrop} />
        <SlidingPanel.Content
          position="bottom"
          className={styles.slidingPanelContent}
        >
          <SlidingPanel.Close
            className={styles.slidingPanelCloseButton}
            aria-label={t('components.search.closeChat')}
          >
            <XMarkIcon className="h-6 w-6" />
          </SlidingPanel.Close>
          <div
            className={`${styles.chatCustomPanel} ${styles.chatMobileContainer} ${styles.chatDesktopContainer} ${styles.chatPanelContainer}`}
          >
            <div className={styles.chatContentWrapper}>
              <ChatInteractions.Wrapper
                ref={containerRef}
                onScroll={recalculateGoToBottomButton}
                onStreaming={recalculateGoToBottomButton}
                onNewInteraction={() => scrollToBottom({ animated: true })}
                className={styles.chatMobilePadding}
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
