import { SparklesIcon } from '@heroicons/react/24/outline';
import { Suggestions } from '@orama/ui/components/Suggestions';

import type { ComponentProps, FC } from 'react';

import styles from './index.module.css';

type SearchSuggestionsProps = {
  suggestions: Array<string>;
  label?: string;
  wrapper?: string;
} & Omit<ComponentProps<typeof Suggestions.Item>, 'children'>;

const SearchSuggestions: FC<SearchSuggestionsProps> = ({
  suggestions,
  label,
  wrapper = styles.suggestionsWrapper,
  className = styles.suggestionItem,
  ...props
}) => (
  <Suggestions.Wrapper className={wrapper}>
    {label && <p className={styles.suggestionsTitle}>{label}</p>}
    {suggestions.map((suggestion, i) => (
      <Suggestions.Item {...props} key={i} className={className}>
        <SparklesIcon />
        {suggestion}
      </Suggestions.Item>
    ))}
  </Suggestions.Wrapper>
);

export default SearchSuggestions;
