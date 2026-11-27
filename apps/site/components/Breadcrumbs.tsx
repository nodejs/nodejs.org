import BreadcrumbsContainer from '@node-core/ui-components/Common/Breadcrumbs';
import { getTranslations } from 'next-intl/server';

import { getClientContext } from '#site/client-context';
import Link from '#site/components/Link';
import { getBreadcrumbs, getSideNavigation } from '#site/util/navigation';

import type { NavigationKeys } from '#site/types';
import type { FC } from 'react';

type BreadcrumbsProps = {
  navKeys?: Array<NavigationKeys>;
};

const Breadcrumbs: FC<BreadcrumbsProps> = async ({ navKeys = [] }) => {
  const t = await getTranslations();
  const { pathname } = getClientContext();

  return (
    <BreadcrumbsContainer
      links={getBreadcrumbs(getSideNavigation(t, navKeys), pathname)}
      maxLength={4}
      mobileMaxLength={2}
      as={Link}
      homeLinkAriaLabel={t('components.common.breadcrumbs.navigateToHome')}
    />
  );
};

export default Breadcrumbs;
