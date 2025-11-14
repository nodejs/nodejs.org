import type { ComponentProps, FC } from 'react';

import SearchInput from '@node-core/ui-components/Common/Search/Input';
import SearchResults from '@node-core/ui-components/Common/Search/Results';

type SearchProps = {
  input: Partial<ComponentProps<typeof SearchInput>>;
  results: Partial<ComponentProps<typeof SearchResults>>;
} & Omit<Partial<ComponentProps<typeof SearchInput>>, 'results'> &
  Omit<Partial<ComponentProps<typeof SearchResults>>, 'results'>;

const Search: FC<SearchProps> = ({ input, results, ...props }) => (
  <>
    <SearchInput {...input} {...props} />
    <SearchResults
      {...(results as ComponentProps<typeof SearchResults>)}
      {...props}
    />
  </>
);

export default Search;
