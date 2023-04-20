import styles from './index.module.scss';
import type { FC } from 'react';

type SectionTitleProps = { path: string[] };

const SectionTitle: FC<SectionTitleProps> = ({ path }) => (
  <div className={styles.sectionTitle}>
    {path.map((item, index) => {
      const isLast = index === path.length - 1;

      if (isLast) {
        return (
          <span className={styles.active} key={item}>
            {item}
          </span>
        );
      }

      return `${item} / `;
    })}
  </div>
);

export default SectionTitle;
