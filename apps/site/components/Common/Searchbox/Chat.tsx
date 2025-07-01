'use client';

import { ArrowUpIcon } from '@heroicons/react/20/solid';
import {
  ArrowPathRoundedSquareIcon,
  ClipboardIcon,
  DocumentCheckIcon,
} from '@heroicons/react/24/outline';
import {
  ArrowDownIcon,
  PauseCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import Skeleton from '@node-core/ui-components/Common/Skeleton';
import {
  ChatInteractions,
  PromptTextArea,
  SlidingPanel,
} from '@orama/ui/components';
import { useScrollableContainer } from '@orama/ui/hooks/useScrollableContainer';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { type FC, type PropsWithChildren } from 'react';

import styles from './chat.module.css';

type SlidingChatPanelProps = PropsWithChildren & {
  open: boolean;
  onClose: () => void;
};

export const SlidingChatPanel: FC<SlidingChatPanelProps> = ({
  open,
  onClose,
}) => {
  const locale = useLocale();
  // const t = useTranslations();
  const {
    containerRef,
    showGoToBottomButton,
    scrollToBottom,
    recalculateGoToBottomButton,
  } = useScrollableContainer();

  return (
    <>
      <SlidingPanel.Wrapper open={open} onClose={onClose}>
        <SlidingPanel.Backdrop />
        <SlidingPanel.Close
          className={styles.slidingPanelCloseButton}
          aria-label="Close chat panel"
        >
          <XMarkIcon className="h-6 w-6" />
        </SlidingPanel.Close>
        <SlidingPanel.Content className={styles.slidingPanelContent}>
          <div className={styles.slidingPanelInner}>
            <div className={styles.slidingPanelTop}>
              <ChatInteractions.Wrapper
                ref={containerRef}
                onScroll={recalculateGoToBottomButton}
                onStreaming={recalculateGoToBottomButton}
                onNewInteraction={() => scrollToBottom({ animated: true })}
                className={styles.chatInteractionsWrapper}
              >
                {(interaction, index, totalInteractions) => (
                  <>
                    <ChatInteractions.UserPrompt
                      className={styles.chatUserPrompt}
                    >
                      <p>{interaction.query}</p>
                    </ChatInteractions.UserPrompt>

                    {interaction.loading && !interaction.response ? (
                      <Skeleton className={styles.chatLoader} />
                    ) : (
                      <>
                        <ChatInteractions.Sources
                          sources={
                            Array.isArray(interaction.sources)
                              ? interaction.sources
                              : []
                          }
                          className={styles.chatSources}
                          itemClassName={styles.chatSourceItem}
                        >
                          {(document, index: number) => (
                            <div className={styles.chatSource} key={index}>
                              <Link
                                data-focus-on-arrow-nav
                                className={styles.chatSourceLink}
                                href={
                                  (
                                    document.siteSection as string
                                  ).toLowerCase() === 'docs'
                                    ? `/${document.path}`
                                    : `/${locale}/${document.path}`
                                }
                              >
                                <span className={styles.chatSourceTitle}>
                                  {document?.pageSectionTitle as string}
                                </span>
                              </Link>
                            </div>
                          )}
                        </ChatInteractions.Sources>

                        <div className={styles.chatAssistantMessageWrapper}>
                          <ChatInteractions.AssistantMessage
                            className={styles.chatAssistantMessage}
                          >
                            {interaction.response}
                          </ChatInteractions.AssistantMessage>

                          {!interaction.loading && (
                            <div className={styles.chatActionsContainer}>
                              <ul className={styles.chatActionsList}>
                                {index === totalInteractions && (
                                  <li>
                                    <ChatInteractions.RegenerateLatest
                                      className={styles.chatAction}
                                    >
                                      <ArrowPathRoundedSquareIcon />
                                    </ChatInteractions.RegenerateLatest>
                                  </li>
                                )}
                                <li>
                                  <ChatInteractions.CopyMessage
                                    className={styles.chatAction}
                                    interaction={interaction}
                                    copiedContent={
                                      <DocumentCheckIcon
                                        className={
                                          styles.chatActionIconSelected
                                        }
                                      />
                                    }
                                  >
                                    <ClipboardIcon />
                                  </ChatInteractions.CopyMessage>
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </>
                )}
              </ChatInteractions.Wrapper>
            </div>
            <div className={styles.slidingPanelBottom}>
              {showGoToBottomButton && (
                <button
                  onClick={() => scrollToBottom({ animated: true })}
                  className={styles.scrollDownButton}
                  aria-label="Scroll to bottom"
                >
                  <ArrowDownIcon />
                </button>
              )}
              <PromptTextArea.Wrapper className={styles.promptTextAreaWrapper}>
                <PromptTextArea.Field
                  placeholder="Ask me anything..."
                  rows={1}
                  maxLength={500}
                  autoFocus
                  className={styles.promptTextAreaField}
                />
                <PromptTextArea.Button
                  abortContent={<PauseCircleIcon />}
                  className={styles.promptTextAreaButton}
                >
                  <ArrowUpIcon />
                </PromptTextArea.Button>
              </PromptTextArea.Wrapper>
              <div className={styles.slidingPanelFooter}>
                <small>
                  AI summaries can make mistakes. Please verify the information.
                </small>
              </div>
            </div>
          </div>
        </SlidingPanel.Content>
      </SlidingPanel.Wrapper>
    </>
  );
};
