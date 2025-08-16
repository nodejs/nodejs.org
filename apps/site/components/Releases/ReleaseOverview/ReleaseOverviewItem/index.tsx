import type { FC, ReactNode, SVGProps } from 'react';

import styles from './index.module.css';

type ReleaseOverviewItemProps = {
  Icon: FC<SVGProps<SVGSVGElement>>;
  title: ReactNode;
  subtitle: ReactNode;
};

const ReleaseOverviewItem: FC<ReleaseOverviewItemProps> = ({
  Icon,
  title,
  subtitle,
}) => {
  return (
    <div className={styles.item}>
      <Icon />
      <div>
        <h2>{subtitle}</h2>
        <h1>{title}</h1>
      </div>
    </div>
  );
};

export default ReleaseOverviewItem;
