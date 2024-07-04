'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import styles from './index.module.css';

const getLogoURL = (theme: string = 'dark') =>
  `https://website-assets.oramasearch.com/orama-when-${theme}.svg`;

export const WithPoweredBy = () => {
  const t = useTranslations();
  const { resolvedTheme } = useTheme();
  const [logoURL, setLogoURL] = useState<string>();

  useEffect(() => setLogoURL(getLogoURL(resolvedTheme)), [resolvedTheme]);

  return (
    <div className={styles.poweredBy}>
      {t('components.search.poweredBy.text')}

      <a
        href="https://oramasearch.com?utm_source=nodejs.org"
        target="_blank"
        rel="noreferer"
      >
        {logoURL && (
          <Image
            src={logoURL}
            alt="Powered by OramaSearch"
            className={styles.poweredByLogo}
            width={80}
            height={20}
          />
        )}
      </a>
    </div>
  );
};
