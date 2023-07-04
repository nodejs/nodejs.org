import { Fragment } from 'react';
import styles from './index.module.scss';
import type { FC, ReactNode } from 'react';

type SectionTitleProps = {
  path: (string | ReactNode)[];
};

const SectionTitle: FC<SectionTitleProps> = ({ path }) => (
  <div className={styles.sectionTitle}>
    {path.map((item, index) => {
      const isLast = index === path.length - 1;

      if (isLast) {
        return (
          <span className={styles.active} key={index}>
            {item}
          </span>
        );
      }

      return (
        <Fragment key={index}>
          {item}
          {' / '}
        </Fragment>
      );
    })}
  </div>
);

export default SectionTitle;
