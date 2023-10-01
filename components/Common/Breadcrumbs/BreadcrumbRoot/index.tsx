import HomeIcon from '@heroicons/react/24/outline/HomeIcon';
import Link from 'next/link';
import type { FC, PropsWithChildren } from 'react';

import BreadcrumbItem from '@/components/Common/Breadcrumbs/BreadcrumbItem';

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
          <Link href="/">
            <HomeIcon aria-label="Home" className={styles.icon} />
          </Link>
        </BreadcrumbItem>
      )}
      {children}
    </ol>
  </nav>
);

export default BreadcrumbRoot;
