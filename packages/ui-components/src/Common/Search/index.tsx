import {
  ArrowDownIcon,
  ArrowTurnDownLeftIcon,
  ArrowUpIcon,
} from '@heroicons/react/24/solid';

import SearchModal from '#ui/Common/Search/Modal';
import SearchResults from '#ui/Common/Search/Results';
import SearchHit from '#ui/Common/Search/Results/Hit';
import useOrama from '#ui/hooks/useOrama';

import styles from './index.module.css';

type SearchBoxProps = {
  closeShortcutLabel?: string;
  navigateShortcutLabel?: string;
  noResultsTitle?: string;
  path: string;
  placeholder?: string;
  selectShortcutLabel?: string;
};

const SearchBox: React.FC<SearchBoxProps> = ({
  path,
  placeholder = 'Start typing...',
  noResultsTitle = 'No results found for',
  closeShortcutLabel = 'to close',
  navigateShortcutLabel = 'to navigate',
  selectShortcutLabel = 'to select',
}) => {
  const client = useOrama(path);

  return (
    <SearchModal client={client} placeholder={placeholder}>
      <div className={styles.searchResultsContainer}>
        <SearchResults
          noResultsTitle={noResultsTitle}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onHit={hit => <SearchHit document={hit.document as any} />}
        />
      </div>

      <div className={styles.footer}>
        <div className={styles.shortcutWrapper}>
          <div className={styles.shortcutItem}>
            <kbd className={styles.shortcutKey}>
              <ArrowTurnDownLeftIcon />
            </kbd>
            <span className={styles.shortcutLabel}>{selectShortcutLabel}</span>
          </div>

          <div className={styles.shortcutItem}>
            <kbd className={styles.shortcutKey}>
              <ArrowDownIcon />
            </kbd>
            <kbd className={styles.shortcutKey}>
              <ArrowUpIcon />
            </kbd>
            <span className={styles.shortcutLabel}>
              {navigateShortcutLabel}
            </span>
          </div>

          <div className={styles.shortcutItem}>
            <kbd className={styles.shortcutKey}>esc</kbd>
            <span className={styles.shortcutLabel}>{closeShortcutLabel}</span>
          </div>
        </div>
      </div>
    </SearchModal>
  );
};

export default SearchBox;
