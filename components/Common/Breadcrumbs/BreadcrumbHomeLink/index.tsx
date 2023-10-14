import HomeIcon from '@heroicons/react/24/outline/HomeIcon';
import type { ComponentProps, FC } from 'react';
import { useIntl } from 'react-intl';

import BreadcrumbLink from '@/components/Common/Breadcrumbs/BreadcrumbLink';

import styles from './index.module.css';

type BreadcrumbHomeLinkProps = Omit<
  ComponentProps<typeof BreadcrumbLink>,
  'href'
> &
  Partial<Pick<ComponentProps<typeof BreadcrumbLink>, 'href'>>;

const BreadcrumbHomeLink: FC<BreadcrumbHomeLinkProps> = ({
  href = '/',
  ...props
}) => {
  const { formatMessage } = useIntl();

  const navigateToHome = formatMessage({
    id: 'components.common.breadcrumbs.navigateToHome',
  });

  return (
    <BreadcrumbLink href={href} {...props}>
      <HomeIcon
        title={navigateToHome}
        aria-label={navigateToHome}
        className={styles.icon}
      />
    </BreadcrumbLink>
  );
};

export default BreadcrumbHomeLink;
