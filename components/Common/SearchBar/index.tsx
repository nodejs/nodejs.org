import { MdTravelExplore, MdClose } from 'react-icons/md';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './index.module.scss';
import SectionTitle from '../SectionTitle';
import { useClickOutside } from '../../../hooks/useClickOutside';
import useKeyPress from '../../../hooks/useKeypress';
import type { FC } from 'react';
import type { SearchFunction, SearchResult } from '../../../types';

type SearchBarProps = {
  search?: SearchFunction;
  setup?: () => Promise<void>;
  footer?: FC | (() => JSX.Element);
};

const containerTransition = { type: 'spring', damping: 22, stiffness: 150 };

const containerVariants = {
  expanded: {
    width: 'auto',
    height: 'auto',
  },
  collapsed: {
    width: 0,
    height: '3em',
  },
};

const SearchBar: FC<SearchBarProps> = ({
  setup,
  search,
  footer: Footer,
}: SearchBarProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const activeResultRef = useRef<number>(-1);

  const [isExpanded, setExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const isEmpty = !results || results.length === 0;

  const containerClassNames = classNames(styles.searchBarContainer, {
    [styles.expanded]: isExpanded,
  });

  const resultsClassNames = classNames(styles.searchResults, {
    [styles.noResults]: isEmpty,
  });

  const expandContainer = useCallback(() => {
    setExpanded(true);
  }, [setExpanded]);

  const collapseContainer = useCallback(() => {
    setQuery('');
    setExpanded(false);
  }, [setQuery, setExpanded]);

  const selectItem = useCallback(
    (index: number) => {
      if (!listRef.current) {
        return;
      }

      const el = listRef.current.children[index]!;
      el.querySelector('a')?.focus();
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    },
    [listRef]
  );

  const toggleContainer = useCallback(() => {
    isExpanded ? collapseContainer() : expandContainer();
  }, [isExpanded, collapseContainer, expandContainer]);

  const onKeyPressHandler = useCallback(() => {
    if (!isExpanded) {
      expandContainer();
    }
  }, [isExpanded, expandContainer]);

  const onQueryChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();

      // Clear results when the query is emptied
      if (!e.target.value) {
        setResults([]);
      }

      setQuery(e.target.value);
    },
    [setQuery, setResults]
  );

  const onBlurHandler = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (!e.currentTarget.contains(e.target) || isEmpty) {
        collapseContainer();
      }
    },
    [isEmpty, collapseContainer]
  );

  const onCloseHandler = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      e.stopPropagation();
      if (isExpanded) {
        collapseContainer();
      }
    },
    [isExpanded, collapseContainer]
  );

  const onSearchResultKeyHandler = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isExpanded || isEmpty || !listRef.current) {
        return;
      }

      const currentResultIndex = activeResultRef.current;
      const maxResultIndex = listRef.current.children.length - 1;

      if (e.key === 'ArrowDown') {
        e.preventDefault();

        activeResultRef.current =
          currentResultIndex + 1 > maxResultIndex ? 0 : currentResultIndex + 1;
        selectItem(activeResultRef.current);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();

        activeResultRef.current =
          currentResultIndex - 1 < 0 ? maxResultIndex : currentResultIndex - 1;
        selectItem(activeResultRef.current);
      }
    },
    [isExpanded, isEmpty, activeResultRef, selectItem]
  );

  const parentRef = useClickOutside<HTMLDivElement>(collapseContainer);

  // Focus the field when expanding the bar
  useEffect(() => {
    if (isExpanded) {
      searchInputRef.current?.focus();
    }
  }, [isExpanded, searchInputRef]);

  // Perform the setup call, if any
  useEffect(() => {
    if (!setup) {
      setIsLoading(false);
      return;
    }

    setup()
      .then(() => {
        setIsLoading(false);
      })
      .catch((error: Error) => {
        console.error('Cannot load search data.', error);
      });
  }, [setup, setIsLoading]);

  // Perform a search when the query changes
  useEffect(() => {
    if (isLoading || !query || !search) {
      return;
    }

    try {
      const searchReturnValue = search(query);

      if (
        typeof (searchReturnValue as Promise<SearchResult[]>).then ===
        'function'
      ) {
        (searchReturnValue as Promise<SearchResult[]>)
          .then(r => setResults(r))
          .catch((error: Error) => {
            console.error('Cannot perform async search.', error);
          });
      } else {
        setResults(searchReturnValue as SearchResult[]);
      }
    } catch (error) {
      console.error('Cannot perform search.', error);
    }
  }, [isLoading, query, search, setResults]);

  useKeyPress({
    targetKey: 'ctrl+k',
    callback: toggleContainer,
    preventDefault: true,
  });

  useKeyPress({
    targetKey: 'meta+k',
    callback: toggleContainer,
    preventDefault: true,
  });

  useKeyPress({
    targetKey: 'Escape',
    callback() {
      if (isExpanded) {
        collapseContainer();
      }
    },
    preventDefault: true,
  });

  return (
    <motion.div
      className={containerClassNames}
      animate={isExpanded ? 'expanded' : 'collapsed'}
      initial="collapsed"
      variants={containerVariants}
      transition={containerTransition}
      ref={parentRef}
      onBlur={onBlurHandler}
      onKeyDown={onSearchResultKeyHandler}
    >
      <div
        className={styles.searchInputContainer}
        onKeyPress={onKeyPressHandler}
        onClick={expandContainer}
        role="presentation"
      >
        <MdTravelExplore className={styles.searchIcon} />
        <label className={styles.searchLabel} htmlFor="searchInput">
          <span>
            {!isExpanded && (
              <FormattedMessage id="components.searchBar.placeholder" />
            )}
          </span>
          <input
            ref={searchInputRef}
            autoComplete="off"
            className={styles.searchInput}
            id="searchInput"
            name="query"
            type="text"
            value={query}
            onFocus={expandContainer}
            onChange={onQueryChangeHandler}
          />
        </label>
        <AnimatePresence>
          {isExpanded && (
            <motion.span
              key="close-icon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MdClose className={styles.closeIcon} onClick={onCloseHandler} />
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {isExpanded && (
        <>
          <div className={resultsClassNames}>
            {isLoading && (
              <div className={styles.loadingMessage}>
                <FormattedMessage id="components.searchBar.search.loading" />
              </div>
            )}

            {!isLoading && isEmpty && (
              <div className={styles.loadingMessage}>
                <FormattedMessage
                  id={
                    query.length
                      ? 'components.searchBar.search.noResults'
                      : 'components.searchBar.search.title'
                  }
                />
              </div>
            )}
            {!isLoading && !isEmpty && (
              <ul ref={listRef} className={styles.searchResultsList}>
                {results.map((result: SearchResult) => {
                  const sectionPath =
                    result.category === 'api'
                      ? ['home', result.category, result.title]
                      : ['home', result.category];

                  const displayTitle = result.displayTitle || result.title;

                  return (
                    <li key={result.id} className={styles.searchResult}>
                      <Link
                        href={result.slug}
                        className={styles.searchResultLink}
                      >
                        {displayTitle &&
                          (result.wrapInCode ? (
                            <code className={styles.searchResultCode}>
                              {displayTitle}
                            </code>
                          ) : (
                            <span className={styles.searchResultText}>
                              {displayTitle}
                            </span>
                          ))}
                        <SectionTitle path={sectionPath} />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {Footer && (
            <div className={styles.searchResultsFooter}>
              <Footer />
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default SearchBar;
