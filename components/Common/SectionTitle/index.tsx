import styles from './index.module.scss';
import type { FC } from 'react';

type SectionTitleProps = { path: string[] };

const SectionTitle: FC<SectionTitleProps> = props => (
  <div className={styles.sectionTitle}>
    {props.path.map((item, index) => {
      const isLast = index === props.path.length - 1;

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
