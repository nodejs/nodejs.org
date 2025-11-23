import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { SearchInput } from '@orama/ui/components';

import type { ComponentProps, FC } from 'react';

import styles from './index.module.css';

type SearchProps = ComponentProps<typeof SearchInput.Input>;

const Input: FC<SearchProps> = ({ searchParams, ...props }) => (
  <SearchInput.Wrapper className={styles.searchInputWrapper}>
    <MagnifyingGlassIcon />
    <SearchInput.Input
      inputId="orama-doc-search"
      className={styles.searchInput}
      searchParams={{
        ...searchParams,
        groupBy: {
          properties: ['siteSection'],
        },
        facets: {
          siteSection: {},
        },
      }}
      {...props}
    />
  </SearchInput.Wrapper>
);

export default Input;
