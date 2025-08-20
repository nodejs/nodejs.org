'use client';

import { PaperAirplaneIcon } from '@heroicons/react/20/solid';
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
import { useLocale, useTranslations } from 'next-intl';
import type { FC, PropsWithChildren } from 'react';

import styles from './index.module.css';

type SlidingChatPanelProps = PropsWithChildren<{
  open: boolean;
  onClose: () => void;
}>;

export const SlidingChatPanel: FC<SlidingChatPanelProps> = ({
  open,
  onClose,
}) => {
  const locale = useLocale();
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
      >
        <SlidingPanel.Backdrop className="bg-black/40" />
        <SlidingPanel.Content
          position="bottom"
          className="h-[80vh] max-w-[100vw] overflow-hidden rounded-xl bg-[#050505] p-4 shadow-lg"
        >
          <SlidingPanel.Close
            className={styles.slidingPanelCloseButton}
            aria-label={t('components.search.closeChat')}
          >
            <XMarkIcon />
          </SlidingPanel.Close>
          <div className="mx-auto flex h-full max-w-4xl flex-col justify-between gap-8 bg-[#050505]">
            <div
              className="flex min-h-0 flex-1 flex-col pb-6"
              style={{
                flex: '1 1 0%',
                minHeight: '0',
                maxHeight: 'calc(80vh - 200px)',
              }}
            >
              <ChatInteractions.Wrapper
                ref={containerRef}
                onScroll={recalculateGoToBottomButton}
                onStreaming={recalculateGoToBottomButton}
                onNewInteraction={() => scrollToBottom({ animated: true })}
                className="relative h-full items-start overflow-y-auto bg-[#050505] px-8"
                style={{ maxHeight: '100%', overflowY: 'auto' }}
              >
                {(interaction, index, totalInteractions) =>
                  interaction && (
                    <>
                      <ChatInteractions.UserPrompt
                        className={styles.chatUserPrompt}
                      >
                        <p>{interaction?.query || ''}</p>
                      </ChatInteractions.UserPrompt>
                      <ChatInteractions.Loading interaction={interaction}>
                        <Skeleton className={styles.chatLoader} />
                      </ChatInteractions.Loading>

                      <>
                        {interaction && interaction.sources && (
                          <ChatInteractions.Sources
                            interaction={interaction}
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
                        )}

                        {interaction && (
                          <div
                            className="my-4 mb-6 max-w-full rounded-xl px-6 py-4 text-base"
                            style={{
                              backgroundColor: '#0d121c',
                              color: 'white',
                            }}
                          >
                            <ChatInteractions.AssistantMessage
                              className="text-white"
                              markdownClassnames={{
                                p: 'my-2 text-white',
                                pre: 'rounded-md bg-black/20 p-4 my-3 text-xs text-white',
                                code: 'bg-black/30 p-1 rounded text-white',
                              }}
                            >
                              {interaction.response || ''}
                            </ChatInteractions.AssistantMessage>

                            <ChatInteractions.Loading interaction={interaction}>
                              <div className={styles.chatActionsContainer}>
                                <ul className={styles.chatActionsList}>
                                  {index === totalInteractions && (
                                    <li>
                                      <ChatInteractions.RegenerateLatest
                                        className={styles.chatAction}
                                        interaction={interaction}
                                      >
                                        <ArrowPathRoundedSquareIcon />
                                      </ChatInteractions.RegenerateLatest>
                                    </li>
                                  )}
                                  <li>
                                    <ChatInteractions.CopyMessage
                                      className={styles.chatAction}
                                      interaction={interaction}
                                    >
                                      {copied =>
                                        copied ? (
                                          <DocumentCheckIcon
                                            className={
                                              styles.chatActionIconSelected
                                            }
                                          />
                                        ) : (
                                          <ClipboardIcon />
                                        )
                                      }
                                    </ChatInteractions.CopyMessage>
                                  </li>
                                </ul>
                              </div>
                            </ChatInteractions.Loading>
                          </div>
                        )}
                      </>
                    </>
                  )
                }
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
              <div className="pb-2 pt-6">
                <PromptTextArea.Wrapper
                  className="relative flex items-center rounded-2xl bg-white text-base shadow-sm"
                  style={{
                    alignItems: 'center',
                    background: '#0d121c',
                    border: 'none',
                    borderRadius: '16px',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    padding: '8px 7px',
                    position: 'relative',
                  }}
                >
                  <PromptTextArea.Field
                    placeholder={t('components.search.chatPlaceholder')}
                    rows={1}
                    maxLength={500}
                    autoFocus
                    className="w-full resize-none border-0 px-0 py-0 text-white placeholder:text-neutral-400 focus:outline-none"
                    style={{
                      background: '#0d121c',
                    }}
                  />
                  <PromptTextArea.Button
                    abortContent={<PauseCircleIcon />}
                    className="cursor-pointer rounded-lg bg-[#838289] p-4 text-white transition-colors duration-300 hover:bg-green-500 disabled:cursor-not-allowed disabled:bg-neutral-600 disabled:text-neutral-400"
                  >
                    <PaperAirplaneIcon className="h-2 w-2 text-white" />
                  </PromptTextArea.Button>
                </PromptTextArea.Wrapper>
                <div className={styles.slidingPanelFooter}>
                  <small>{t('components.search.disclaimer')}</small>
                </div>
              </div>
            </div>
          </div>
        </SlidingPanel.Content>
      </SlidingPanel.Wrapper>
    </>
  );
};
