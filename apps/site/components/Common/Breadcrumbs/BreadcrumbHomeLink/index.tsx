import HomeIcon from '@heroicons/react/24/outline/HomeIcon';
import { useTranslations } from 'next-intl';
import type { ComponentProps, FC } from 'react';

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
  const t = useTranslations();

  const navigateToHome = t('components.common.breadcrumbs.navigateToHome');

  return (
    <BreadcrumbLink href={href} aria-label={navigateToHome} {...props}>
      <HomeIcon
        title={navigateToHome}
        aria-label={navigateToHome}
        className={styles.icon}
      />
    </BreadcrumbLink>
  );
};

export default BreadcrumbHomeLink;
