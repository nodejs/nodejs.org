import Image from 'next/image';

import styles from './index.module.css';

export const PoweredBy = () => (
  <div className={styles.poweredBy}>
    powered by
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
