import { SparklesIcon } from '@heroicons/react/24/outline';
import { Suggestions } from '@orama/ui/components/Suggestions';

import type { ComponentProps, FC } from 'react';

import styles from './index.module.css';

type SearchSuggestionsProps = {
  suggestions: Array<string>;
  label?: string;
} & Omit<ComponentProps<typeof Suggestions.Item>, 'children'>;

const SearchSuggestions: FC<SearchSuggestionsProps> = ({
  suggestions,
  label,
  ...props
}) => (
  <Suggestions.Wrapper className={styles.suggestionsWrapper}>
    {label && <p className={styles.suggestionsTitle}>{label}</p>}
    {suggestions.map((suggestion, i) => (
      <Suggestions.Item {...props} key={i} className={styles.suggestionItem}>
        <SparklesIcon />
        {suggestion}
      </Suggestions.Item>
    ))}
  </Suggestions.Wrapper>
);

export default SearchSuggestions;
