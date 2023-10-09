import styles from './index.module.css';

const Ellipsis = () => (
  <span aria-hidden="true" className={styles.ellipsis}>
    ...
  </span>
);

export default Ellipsis;
