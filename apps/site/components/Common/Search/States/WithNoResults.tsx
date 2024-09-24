import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import styles from './index.module.css';

type NoResultsProps = { searchTerm: string };

export const WithNoResults: FC<NoResultsProps> = props => {
  const t = useTranslations();

  return (
    <div className={styles.noResultsContainer}>
      {t('components.search.noResults.text', { query: props.searchTerm })}
    </div>
  );
};
