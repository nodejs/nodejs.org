'use client';

import { ArrowUpIcon } from '@heroicons/react/20/solid';
import {
  ArrowPathRoundedSquareIcon,
  ClipboardIcon,
  DocumentCheckIcon,
} from '@heroicons/react/24/outline';
import { ArrowDownIcon, PauseCircleIcon } from '@heroicons/react/24/solid';
import Skeleton from '@node-core/ui-components/Common/Skeleton';
import {
  ChatInteractions,
  PromptTextArea,
  SlidingPanel,
} from '@orama/ui/components';
import { useScrollableContainer } from '@orama/ui/hooks';
// import classNames from 'classnames';
// import Link from 'next/link';
// import { useLocale } from 'next-intl';
// import { useTranslations } from 'next-intl';
import { type FC, type PropsWithChildren } from 'react';

import styles from './index.module.css';

type SlidingChatPanelProps = PropsWithChildren & {
  open: boolean;
  onClose: () => void;
};

// const uppercaseFirst = (word: string) =>
//   word.charAt(0).toUpperCase() + word.slice(1);

// const getFormattedPath = (path: string, title: string) =>
//   `${path
//     .replace(/#.+$/, '')
//     .split('/')
//     .map(element => element.replaceAll('-', ' '))
//     .map(element => uppercaseFirst(element))
//     .filter(Boolean)
//     .join(' > ')} — ${title}`;

export const SlidingChatPanel: FC<SlidingChatPanelProps> = ({
  open,
  onClose,
}) => {
  // const locale = useLocale();
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
        <SlidingPanel.Content className={styles.slidingPanelContent}>
          <div className={styles.slidingPanelTop}>
            <div className={styles.chatContainer}>
              <ChatInteractions.Wrapper
                ref={containerRef}
                onScroll={recalculateGoToBottomButton}
                onStreaming={recalculateGoToBottomButton}
                onNewInteraction={() => scrollToBottom({ animated: true })}
                className={styles.chatInteractionsWrapper}
              >
                {(interaction, index, totalInteractions) => (
                  <div className={styles.chatInteraction}>
                    <ChatInteractions.UserPrompt
                      className={styles.chatUserPrompt}
                    >
                      <p>{interaction.query}</p>
                    </ChatInteractions.UserPrompt>

                    {interaction.loading && !interaction.response && (
                      <Skeleton className={styles.chatLoader} />
                    )}

                    <ChatInteractions.Sources
                      sources={
                        Array.isArray(interaction.sources)
                          ? interaction.sources
                          : []
                      }
                      className={`mb-1 mt-2 flex flex-row gap-1 overflow-x-auto`}
                    >
                      {(document, index: number) => (
                        <div
                          className="flex max-w-xs items-center gap-2"
                          key={index}
                        >
                          <div className="flex min-w-0 flex-col">
                            <span className={`text-xs font-semibold`}>
                              {document?.pageSectionTitle as string}
                            </span>
                          </div>
                        </div>
                      )}
                    </ChatInteractions.Sources>

                    <div className={styles.chatAssistantMessage}>
                      <ChatInteractions.AssistantMessage>
                        {interaction.response}
                      </ChatInteractions.AssistantMessage>

                      {interaction.response && !interaction.loading && (
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
                                    className={styles.chatActionIconSelected}
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
                  </div>
                )}
              </ChatInteractions.Wrapper>
            </div>
            <div className={styles.slidingPanel}>
              {showGoToBottomButton && (
                <button
                  onClick={() => scrollToBottom({ animated: true })}
                  className="absolute -top-10 left-1/2 -translate-x-1/2 cursor-pointer rounded-full bg-purple-500 p-2 text-white shadow-lg transition-colors hover:bg-purple-600"
                  aria-label="Scroll to bottom"
                >
                  <ArrowDownIcon className="h-4 w-4" />
                </button>
              )}
              <PromptTextArea.Wrapper className={styles.promptTextAreaWrapper}>
                <PromptTextArea.Field
                  placeholder="Ask me anything"
                  rows={1}
                  maxLength={500}
                  autoFocus
                  className={styles.promptTextAreaField}
                />
                <PromptTextArea.Button
                  abortContent={<PauseCircleIcon className="h-4 w-4" />}
                  className={styles.promptTextAreaButton}
                >
                  <ArrowUpIcon className="h-4 w-4" />
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
