import Image from 'next/image';
import { useTranslations } from 'next-intl';

import styles from './index.module.css';

export const PoweredBy = () => {
  const t = useTranslations();

  return (
    <div className={styles.poweredBy}>
      {t('components.search.poweredBy.text')}
      <a
        href="https://oramasearch.com?utm_source=nodejs.org"
        target="_blank"
        rel="noreferer"
      >
        <Image
          src="https://website-assets.oramasearch.com/light-orama-logo.svg"
          alt="Powered by OramaSearch"
          className={styles.poweredByLogo}
          width={80}
          height={20}
        />
      </a>
    </div>
  );
};
