'use client';

import {
  ArrowTurnDownLeftIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from '@heroicons/react/24/solid';
import OramaLogo from '@node-core/ui-components/Icons/PartnerLogos/Orama/Logo';
import { useTranslations } from 'next-intl';

import styles from './index.module.css';

export const Footer = () => {
  const t = useTranslations();

  return (
    <div className={styles.footer}>
      <div className={styles.shortcutWrapper}>
        <div className={styles.shortcutItem}>
          <kbd className={styles.shortcutKey}>
            <ArrowTurnDownLeftIcon />
          </kbd>
          <span className={styles.shortcutLabel}>
            {t('components.search.keyboardShortcuts.select')}
          </span>
        </div>
        <div className={styles.shortcutItem}>
          <kbd className={styles.shortcutKey}>
            <ArrowDownIcon />
          </kbd>
          <kbd className={styles.shortcutKey}>
            <ArrowUpIcon />
          </kbd>
          <span className={styles.shortcutLabel}>
            {t('components.search.keyboardShortcuts.navigate')}
          </span>
        </div>
        <div className={styles.shortcutItem}>
          <kbd className={styles.shortcutKey}>esc</kbd>
          <span className={styles.shortcutLabel}>
            {t('components.search.keyboardShortcuts.close')}
          </span>
        </div>
      </div>
      <div className={styles.poweredByWrapper}>
        <a
          href="https://www.orama.com/?utm_source=nodejs.org&utm_medium=powered-by"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.poweredByLink}
        >
          <small>{t('components.search.poweredBy')}</small>
          <OramaLogo className={styles.oramaLogo} />
        </a>
      </div>
    </div>
  );
};
