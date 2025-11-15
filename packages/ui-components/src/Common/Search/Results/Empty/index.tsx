import { SearchResults, Suggestions } from '@orama/ui/components';
import type { ComponentProps, FC, PropsWithChildren } from 'react';

import styles from './index.module.css';

type EmptyResultsProps = {
  label?: string;
} & Omit<ComponentProps<typeof Suggestions.Item>, 'children'>;

const SearchResultsEmpty: FC<PropsWithChildren<EmptyResultsProps>> = ({
  children,
  label,
}) => (
  <SearchResults.NoResults>
    {term =>
      term ? (
        <div className={styles.noResultsWrapper}>
          {label} "{term}"
        </div>
      ) : (
        children
      )
    }
  </SearchResults.NoResults>
);

export default SearchResultsEmpty;
