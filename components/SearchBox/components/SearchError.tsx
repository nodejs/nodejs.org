import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import styles from './index.module.css';

export const SearchError: FC = () => {
  const t = useTranslations();

  return (
    <div className={styles.searchErrorContainer}>
      {t('components.search.searchError.text')}
    </div>
  );
};
