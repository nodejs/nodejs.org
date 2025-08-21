'use client';

import { ArrowDownIcon, XMarkIcon } from '@heroicons/react/24/solid';
import type { Interaction } from '@orama/core';
import { ChatInteractions, SlidingPanel } from '@orama/ui/components';
import { useScrollableContainer } from '@orama/ui/hooks/useScrollableContainer';
import { useTranslations } from 'next-intl';
import type { FC, PropsWithChildren } from 'react';

import { ChatInput } from './ChatInput';
import { ChatMessage } from './ChatMessage';
import styles from './index.module.css';

type SlidingChatPanelProps = PropsWithChildren<{
  open: boolean;
  onClose: () => void;
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
      <SlidingPanel.Wrapper
        open={open}
        onClose={onClose}
        data-sliding-panel="true"
        className="fixed inset-0 z-[10019]"
      >
        <SlidingPanel.Backdrop className="fixed inset-0 z-[10018] bg-black/60" />
        <SlidingPanel.Content
          position="bottom"
          className="fixed bottom-0 left-0 z-[10019] box-border h-[95vh] w-full overflow-hidden p-0"
          style={{
            backgroundColor: '#050505',
            border: '1px solid #2c3437',
            borderRadius:
              'var(--radius-m, calc(12rem / var(--orama-base-font-size, 16))) var(--radius-m, calc(12rem / var(--orama-base-font-size, 16))) 0 0',
            color: '#ffffff',
            transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <SlidingPanel.Close
            className={styles.slidingPanelCloseButton}
            aria-label={t('components.search.closeChat')}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              zIndex: 30,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white',
              cursor: 'pointer',
              backdropFilter: 'blur(4px)',
              transition: 'all 0.3s ease',
            }}
          >
            <XMarkIcon style={{ width: '24px', height: '24px' }} />
          </SlidingPanel.Close>
          <div
            className="flex h-full flex-col py-4"
            style={{
              height: '95vh',
              margin: '0px auto',
              maxWidth: 'calc(840rem / var(--orama-base-font-size, 16))',
              width: '80%',
            }}
          >
            <div
              className="flex min-h-0 flex-1 flex-col pb-6"
              style={{
                flex: '1 1 0%',
                minHeight: '0',
                maxHeight: 'calc(95vh - 200px)',
              }}
            >
              <ChatInteractions.Wrapper
                ref={containerRef}
                onScroll={recalculateGoToBottomButton}
                onStreaming={recalculateGoToBottomButton}
                onNewInteraction={() => scrollToBottom({ animated: true })}
                className="relative h-full items-start overflow-y-auto px-8"
                style={{ maxHeight: '100%', overflowY: 'auto' }}
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
