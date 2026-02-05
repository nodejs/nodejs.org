'use client';

import {
  ArrowTurnDownLeftIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

import styles from './index.module.css';

export const Footer = () => {
  const t = useTranslations();
  const { resolvedTheme } = useTheme();

  const oramaLogo = `https://website-assets.oramasearch.com/orama-when-${resolvedTheme}.svg`;

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
          <Image
            src={oramaLogo}
            alt={t('components.search.poweredBy')}
            width="62"
            height="12"
          />
        </a>
      </div>
    </div>
  );
};
