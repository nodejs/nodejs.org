import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

import styles from './index.module.css';

export const WithPoweredBy = () => {
  const t = useTranslations();
  const { theme } = useTheme();
  const logoURL = `https://website-assets.oramasearch.com/orama-when-${theme}.svg`;

  return (
    <div className={styles.poweredBy}>
      {t('components.search.poweredBy.text')}
      <a
        href="https://oramasearch.com?utm_source=nodejs.org"
        target="_blank"
        rel="noreferer"
      >
        <Image
          src={logoURL}
          alt="Powered by OramaSearch"
          className={styles.poweredByLogo}
          width={80}
          height={20}
        />
      </a>
    </div>
  );
};
