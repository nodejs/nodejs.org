import { SparklesIcon } from '@heroicons/react/24/outline';
import { SearchResults, Suggestions } from '@orama/ui/components';
import type { ComponentProps, FC } from 'react';

import styles from './index.module.css';

type EmptyResultsProps = {
  suggestions: Array<string>;
  suggestionsTitle?: string;
  noResultsTitle?: string;
} & Omit<ComponentProps<typeof Suggestions.Item>, 'children'>;

const SearchResultsEmpty: FC<EmptyResultsProps> = ({
  suggestions,
  noResultsTitle,
  suggestionsTitle,
  ...props
}) => (
  <SearchResults.NoResults>
    {term =>
      term ? (
        <div className={styles.noResultsWrapper}>
          {noResultsTitle} "{term}"
        </div>
      ) : (
        <Suggestions.Wrapper className={styles.suggestionsWrapper}>
          <p className={styles.suggestionsTitle}>{suggestionsTitle}</p>
          {suggestions.map(suggestion => (
            <Suggestions.Item {...props} className={styles.suggestionItem}>
              <SparklesIcon />
              {suggestion}
            </Suggestions.Item>
          ))}
        </Suggestions.Wrapper>
      )
    }
  </SearchResults.NoResults>
);

export default SearchResultsEmpty;
