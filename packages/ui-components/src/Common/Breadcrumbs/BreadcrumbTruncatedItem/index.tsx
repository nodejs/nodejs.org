import BreadcrumbItem from '#ui/Common/Breadcrumbs/BreadcrumbItem';

import type { FC } from 'react';

type BreadcrumbTruncatedItemProps = {
  /** Shown below the `sm` breakpoint only */
  mobileOnly?: boolean;
};

const BreadcrumbTruncatedItem: FC<BreadcrumbTruncatedItemProps> = ({
  mobileOnly = false,
}) => (
  <BreadcrumbItem disableMicrodata mobileOnly={mobileOnly}>
    <button disabled>…</button>
  </BreadcrumbItem>
);

export default BreadcrumbTruncatedItem;
