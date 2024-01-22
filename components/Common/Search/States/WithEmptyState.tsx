import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import styles from './index.module.css';

export const WithEmptyState: FC = () => {
  const t = useTranslations();

  return (
    <div className={styles.emptyStateContainer}>
      {t('components.search.emptyState.text')}
    </div>
  );
};
