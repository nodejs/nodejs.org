import HomeIcon from '@heroicons/react/24/outline/HomeIcon';
import type { FC, PropsWithChildren } from 'react';

import BreadcrumbItem from '@/components/Common/Breadcrumbs/BreadcrumbItem';
import LocalizedLink from '@/components/LocalizedLink';

import styles from './index.module.css';

type BreadcrumbRootProps = {
  hideHome?: boolean;
};

const BreadcrumbRoot: FC<PropsWithChildren<BreadcrumbRootProps>> = ({
  hideHome = false,
  children,
}) => (
  <nav aria-label="breadcrumb">
    <ol className={styles.list}>
      {!hideHome && (
        <BreadcrumbItem>
          <LocalizedLink href="/">
            <HomeIcon aria-label="Home" className={styles.icon} />
          </LocalizedLink>
        </BreadcrumbItem>
      )}
      {children}
    </ol>
  </nav>
);

export default BreadcrumbRoot;
