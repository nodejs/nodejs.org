import classNames from 'classnames';
import type { FC, ReactNode, SVGProps } from 'react';

import styles from './index.module.css';

type ReleaseOverviewItemProps = {
  Icon: FC<SVGProps<SVGSVGElement>>;
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
};

const ReleaseOverviewItem: FC<ReleaseOverviewItemProps> = ({
  Icon,
  title,
  subtitle,
  className,
}) => {
  return (
    <div className={classNames(styles.item, className)}>
      <Icon />
      <div>
        {subtitle && <h2>{subtitle}</h2>}
        <h1>{title}</h1>
      </div>
    </div>
  );
};

export default ReleaseOverviewItem;
