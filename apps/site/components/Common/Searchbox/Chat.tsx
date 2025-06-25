'use client';

import { ArrowUpIcon, ClipboardDocumentIcon } from '@heroicons/react/20/solid';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import {
  ArrowDownIcon,
  CircleStackIcon,
  PauseCircleIcon,
} from '@heroicons/react/24/solid';
import ChatInteractions from '@orama/ui/components/ChatInteractions';
import PromptTextArea from '@orama/ui/components/PromptTextArea';
import { SlidingPanel } from '@orama/ui/components/SlidingPanel';
import { useScrollableContainer } from '@orama/ui/hooks/useScrollableContainer';
// import classNames from 'classnames';
// import Link from 'next/link';
// import { useLocale } from 'next-intl';
// import { useTranslations } from 'next-intl';
import { Fragment, type FC, type PropsWithChildren } from 'react';

// import styles from './index.module.css';

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
        <SlidingPanel.Backdrop className="bg-black/50" />
        <SlidingPanel.Content
          className={`overflow-hidden rounded-xl bg-neutral-50 text-neutral-900 shadow-lg md:max-w-none`}
        >
          <div className="mx-auto flex h-full max-w-3xl flex-col justify-between gap-2">
            <div className="flex-shrink-0">
              <button
                onClick={onClose}
                className={`text-smopacity-70 flex cursor-pointer items-center transition-opacity hover:opacity-100`}
              >
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                Back
              </button>
            </div>

            <div className="flex min-h-0 flex-1 flex-col">
              <ChatInteractions.Wrapper
                ref={containerRef}
                onScroll={recalculateGoToBottomButton}
                onStreaming={recalculateGoToBottomButton}
                onNewInteraction={() => scrollToBottom({ animated: true })}
                className="relative h-full items-start overflow-y-auto"
              >
                {(interaction, index, totalInteractions) => (
                  <>
                    <ChatInteractions.UserPrompt
                      className={`ml-auto max-w-xs rounded-lg rounded-br-sm bg-purple-100 p-3`}
                    >
                      <p className={`text-sm`}>{interaction.query}</p>
                    </ChatInteractions.UserPrompt>
                    {interaction.loading &&
                      !interaction.response && ( // TODO; use theme
                        <div className="my-2 animate-pulse">
                          <div className="mb-2 h-4 w-3/4 rounded bg-gray-300 dark:bg-gray-600"></div>
                          <div className="h-4 w-1/2 rounded bg-gray-300 dark:bg-gray-600"></div>
                        </div>
                      )}
                    <ChatInteractions.Sources
                      sources={
                        Array.isArray(interaction.sources)
                          ? interaction.sources
                          : []
                      }
                      className={`mb-1 mt-2 flex flex-row gap-1 overflow-x-auto`}
                      itemClassName={''}
                    >
                      {(document, index: number) => (
                        <div
                          className="flex max-w-xs items-center gap-2"
                          key={index}
                        >
                          <div className="flex min-w-0 flex-col">
                            <span className={`text-xs font-semibold`}>
                              {document?.title as string}
                            </span>
                            <span className={`text-xs`}>
                              {typeof document?.content === 'string'
                                ? document.content.substring(0, 40)
                                : ''}
                              ...
                            </span>
                          </div>
                        </div>
                      )}
                    </ChatInteractions.Sources>

                    <ChatInteractions.AssistantMessage
                      className={`text-smmy-3 max-w-full rounded-lg bg-gray-100 p-3`}
                    >
                      {interaction.response}
                    </ChatInteractions.AssistantMessage>

                    {interaction.response && !interaction.loading && (
                      <div
                        className={`${index !== totalInteractions ? ' justify-end' : ''}`}
                      >
                        <Fragment>
                          {index === totalInteractions && (
                            <div>
                              <ChatInteractions.Reset className={''}>
                                Reset all
                              </ChatInteractions.Reset>
                            </div>
                          )}
                        </Fragment>
                        <ul className="flex space-x-2">
                          {index === totalInteractions && (
                            <li>
                              <ChatInteractions.RegenerateLatest className={''}>
                                <CircleStackIcon className="h-4 w-4" />
                              </ChatInteractions.RegenerateLatest>
                            </li>
                          )}
                          <li>
                            <ChatInteractions.CopyMessage
                              className={''}
                              interaction={interaction}
                              copiedContent={
                                <ClipboardDocumentIcon className="h-4 w-4" />
                              }
                            >
                              {/* <Copy className="h-4 w-4" /> */}
                              Copy
                            </ChatInteractions.CopyMessage>
                          </li>
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </ChatInteractions.Wrapper>
            </div>
            <div className="relative flex-shrink-0">
              {showGoToBottomButton && (
                <button
                  onClick={() => scrollToBottom({ animated: true })}
                  // display after a few seconds of scrolling
                  className="absolute -top-10 left-1/2 -translate-x-1/2 cursor-pointer rounded-full bg-purple-500 p-2 text-white shadow-lg transition-colors hover:bg-purple-600"
                  aria-label="Scroll to bottom"
                >
                  <ArrowDownIcon className="h-4 w-4" />
                </button>
              )}
              <PromptTextArea.Wrapper className="flex items-center space-x-2">
                <PromptTextArea.Field
                  placeholder="Type a message..."
                  rows={1}
                  maxLength={500}
                  autoFocus
                  className={`placeholder:text-muted-foreground flex-1 rounded-lg border px-3 py-2 transition-colors focus:outline-none focus:ring-2`}
                />
                <PromptTextArea.Button
                  abortContent={<PauseCircleIcon className="h-4 w-4" />}
                  className={`cursor-pointer rounded-lg p-2 text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  <ArrowUpIcon className="h-4 w-4" />
                </PromptTextArea.Button>
              </PromptTextArea.Wrapper>
            </div>
          </div>
        </SlidingPanel.Content>
      </SlidingPanel.Wrapper>
    </>
  );
};
