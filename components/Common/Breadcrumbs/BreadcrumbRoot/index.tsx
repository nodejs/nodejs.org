import HomeIcon from '@heroicons/react/24/outline/HomeIcon';
import type { FC, PropsWithChildren } from 'react';
import { useIntl } from 'react-intl';

import BreadcrumbItem from '@/components/Common/Breadcrumbs/BreadcrumbItem';
import LocalizedLink from '@/components/LocalizedLink';

import styles from './index.module.css';

type BreadcrumbRootProps = {
  hideHome?: boolean;
};

const BreadcrumbRoot: FC<PropsWithChildren<BreadcrumbRootProps>> = ({
  hideHome = false,
  children,
}) => {
  const { formatMessage } = useIntl();

  const navigateToHome = formatMessage({
    id: 'components.common.breadcrumbs.navigateToHome',
  });

  return (
    <nav aria-label="breadcrumb">
      <ol
        itemScope
        itemType="https://schema.org/BreadcrumbList"
        className={styles.list}
      >
        {!hideHome && (
          <BreadcrumbItem>
            <LocalizedLink
              itemScope
              itemType="http://schema.org/Thing"
              itemProp="item"
              itemID="/"
              href="/"
            >
              <span itemProp="name">
                <HomeIcon
                  title={navigateToHome}
                  aria-label={navigateToHome}
                  className={styles.icon}
                />
              </span>
              <meta itemProp="position" content="1" />
            </LocalizedLink>
          </BreadcrumbItem>
        )}
        {children}
      </ol>
    </nav>
  );
};

export default BreadcrumbRoot;
