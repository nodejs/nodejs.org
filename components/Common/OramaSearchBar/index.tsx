import { create, load } from '@orama/orama';
import { useTheme } from 'next-themes';
import { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { OramaLogoDark, OramaLogoLight } from './OramaLogo';
import styles from './index.module.scss';
import { identityDocumentMapper, performSearch } from './search';
import SearchBar from '../SearchBar';

import type { FC } from 'react';
import type { OramaSearchBarProps } from './search';
import type { SearchFunction } from '../../../types';

const Footer: FC = () => {
  const { resolvedTheme: theme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <div className={styles.oramaSearchBarFooter}>
      <span className={styles.oramaSearchBarFooterLabel}>
        <FormattedMessage id="components.oramaSearchBar.search.poweredBy" />
      </span>
      <a
        href="http://oramajs.io"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.oramaSearchBarFooterLink}
      >
        {isDark ? (
          <OramaLogoDark className={styles.oramaSearchBarFooterLogo} />
        ) : (
          <OramaLogoLight className={styles.oramaSearchBarFooterLogo} />
        )}
      </a>
    </div>
  );
};

const OramaSearchBar: FC<OramaSearchBarProps> = ({
  schema,
  index,
  documentMapper,
}: OramaSearchBarProps) => {
  const [searchFunction, setSearchFunction] = useState<SearchFunction>();

  // Create a setup function to deserialize the database
  const setup = useCallback(async () => {
    const database = await create({ schema });
    await load(database, index);

    setSearchFunction(() =>
      performSearch.bind(
        null,
        database,
        documentMapper ?? identityDocumentMapper
      )
    );
  }, [schema, index, documentMapper, setSearchFunction]);

  return <SearchBar setup={setup} search={searchFunction} footer={Footer} />;
};

export default OramaSearchBar;
