'use client';

import { ArrowUpIcon, ClipboardDocumentIcon } from '@heroicons/react/20/solid';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import {
  ArrowDownIcon,
  CircleStackIcon,
  MagnifyingGlassIcon,
  PauseCircleIcon,
} from '@heroicons/react/24/solid';
import { CollectionManager } from '@orama/core';
import ChatInteractions from '@orama/ui/components/ChatInteractions';
import ChatRoot from '@orama/ui/components/ChatRoot';
import FacetTabs from '@orama/ui/components/FacetTabs';
import Modal from '@orama/ui/components/Modal';
import PromptTextArea from '@orama/ui/components/PromptTextArea';
import SearchInput from '@orama/ui/components/SearchInput';
import SearchResults from '@orama/ui/components/SearchResults';
import SearchRoot from '@orama/ui/components/SearchRoot';
import { SlidingPanel } from '@orama/ui/components/SlidingPanel';
import Suggestions from '@orama/ui/components/Suggestions';
import { useScrollableContainer } from '@orama/ui/hooks/useScrollableContainer';
import classNames from 'classnames';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { Fragment, useState, type FC, type PropsWithChildren } from 'react';

import styles from './index.module.css';

const oramaClient = new CollectionManager({
  url: 'https://staging.collections.orama.com',
  collectionID: 'dpygf82gs9bvtf6o85fjuj40',
  readAPIKey: '2pj8SUaPGbakScglDBHfJbV5aIuWmT7y',
});

const uppercaseFirst = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);

const getFormattedPath = (path: string, title: string) =>
  `${path
    .replace(/#.+$/, '')
    .split('/')
    .map(element => element.replaceAll('-', ' '))
    .map(element => uppercaseFirst(element))
    .filter(Boolean)
    .join(' > ')} — ${title}`;

const InnerSearchBox: FC<PropsWithChildren> = () => {
  const locale = useLocale();
  const [displayChat, setDisplayChat] = useState(false);
  const {
    containerRef,
    showGoToBottomButton,
    scrollToBottom,
    recalculateGoToBottomButton,
  } = useScrollableContainer();

  return (
    <>
      <SearchInput.Wrapper className={styles.searchInputWrapper}>
        <SearchInput.Input
          inputId="product-search"
          ariaLabel="Search for products"
          placeholder="Find your next favorite thing..."
          className="w-full rounded-lg border border-gray-300 px-4 py-2 transition-colors focus:outline-none focus:ring-1 focus:ring-pink-400"
          searchParams={{
            groupBy: 'siteSection',
          }}
        />
      </SearchInput.Wrapper>

      <button
        type="button"
        onClick={() => setDisplayChat(true)}
        className={classNames(
          'my-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-purple-500 px-4 py-2 text-white transition-colors hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400',
          styles.chatButton
        )}
      >
        <span className="text-sm">Chat with us</span>
      </button>

      <FacetTabs.Wrapper>
        <FacetTabs.List className="flex gap-1 space-x-2">
          {(group, isSelected) => (
            <FacetTabs.Item
              isSelected={isSelected}
              group={group}
              className={classNames(
                'cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isSelected
                  ? 'bg-pink-100 text-pink-800 dark:bg-pink-700 dark:text-pink-200'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              )}
            >
              {group.name} ({group.count})
            </FacetTabs.Item>
          )}
        </FacetTabs.List>
      </FacetTabs.Wrapper>

      <SearchResults.NoResults className="mt-4">
        {searchTerm => (
          <>
            {searchTerm ? (
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {`No results found for "${searchTerm}". Please try a different search term.`}
              </p>
            ) : (
              <Suggestions.Wrapper className="flex flex-col justify-center">
                <p className="mb-2 text-sm font-semibold text-slate-800 dark:text-slate-400">
                  Suggestions
                </p>
                <Suggestions.List className="mt-1 space-y-1">
                  <Suggestions.Item
                    onClick={() => setDisplayChat(true)}
                    className="cursor-pointer text-sm text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                    itemClassName="cursor-pointer"
                  >
                    How to install Node.js?
                  </Suggestions.Item>
                  <Suggestions.Item
                    onClick={() => setDisplayChat(true)}
                    className="cursor-pointer text-sm text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                    itemClassName="cursor-pointer"
                  >
                    How to create an HTTP server?
                  </Suggestions.Item>
                  <Suggestions.Item
                    onClick={() => setDisplayChat(true)}
                    className="cursor-pointer text-sm text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                    itemClassName="cursor-pointer"
                  >
                    Upgrading Node.js version
                  </Suggestions.Item>
                </Suggestions.List>
              </Suggestions.Wrapper>
            )}
          </>
        )}
      </SearchResults.NoResults>

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        <SearchResults.GroupsWrapper
          className="relative items-start overflow-y-auto"
          groupBy="siteSection"
        >
          {group => (
            <div key={group.name} className="mb-4">
              <h2 className="text-md mb-3 mt-3 font-semibold uppercase text-gray-400 dark:text-slate-200">
                {group.name}
              </h2>
              <SearchResults.GroupList group={group}>
                {hit => (
                  <SearchResults.Item className="border-b-1 block cursor-pointer border-gray-200 bg-white px-3 py-4 duration-200 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:hover:bg-gray-700">
                    <Link
                      href={
                        (hit.document.siteSection as string).toLowerCase() ===
                        'docs'
                          ? `/${hit.document.path}`
                          : `/${locale}/${hit.document.path}`
                      }
                    >
                      {typeof hit.document?.pageSectionTitle === 'string' && (
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                          {hit.document?.pageSectionTitle}
                        </h3>
                      )}
                      {typeof hit.document?.pageSectionTitle === 'string' &&
                        typeof hit.document?.path === 'string' && (
                          <p className="overflow-hidden text-ellipsis text-sm text-slate-600 dark:text-slate-400">
                            {getFormattedPath(
                              hit.document?.path,
                              hit.document?.pageSectionTitle
                            )}
                          </p>
                        )}
                    </Link>
                  </SearchResults.Item>
                )}
              </SearchResults.GroupList>
            </div>
          )}
        </SearchResults.GroupsWrapper>
      </div>
      <SlidingPanel.Wrapper
        open={displayChat}
        onClose={() => setDisplayChat(false)}
      >
        <SlidingPanel.Backdrop className="bg-black/50" />
        <SlidingPanel.Content
          className={`overflow-hidden rounded-xl bg-neutral-50 text-neutral-900 shadow-lg md:max-w-none`}
        >
          <div className="mx-auto flex h-full max-w-3xl flex-col justify-between gap-2">
            <div className="flex-shrink-0">
              <button
                onClick={() => setDisplayChat(false)}
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

const OramaSearch: FC<PropsWithChildren> = () => {
  const [open, setOpen] = useState(false);
  const t = useTranslations();

  const openSearchBox = (): void => {
    setOpen(true);
  };
  return (
    <>
      <button
        type="button"
        onClick={openSearchBox}
        className={styles.searchButton}
      >
        <div className={styles.searchButtonContent}>
          <MagnifyingGlassIcon className="h-4 w-4" />
          {t('components.search.searchPlaceholder')}
        </div>
        <span className={styles.searchButtonShortcut}>⌘ K</span>
      </button>

      <Modal.Wrapper
        open={open}
        onModalClosed={() => setOpen(false)}
        closeOnOutsideClick={true}
        closeOnEscape={true}
        className={styles.modalWrapper}
      >
        <Modal.Inner className={styles.modalInner}>
          <Modal.Content>
            <SearchRoot client={oramaClient}>
              <ChatRoot client={oramaClient}>
                <InnerSearchBox />
              </ChatRoot>
            </SearchRoot>
          </Modal.Content>
        </Modal.Inner>
      </Modal.Wrapper>
    </>
  );
};

export default OramaSearch;
