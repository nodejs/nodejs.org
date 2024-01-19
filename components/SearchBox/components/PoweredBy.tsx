import styles from './index.module.css';

export const PoweredBy = () => {
  return (
    <div className={styles.poweredBy}>
      powered by
      <a
        href="https://oramasearch.com?utm_source=nodejs.org"
        target="_blank"
        rel="noreferer"
      >
        <img
          src="https://website-assets.oramasearch.com/light-orama-logo.svg"
          alt="Orama"
          className={styles.poweredByLogo}
        />
      </a>
    </div>
  );
};
