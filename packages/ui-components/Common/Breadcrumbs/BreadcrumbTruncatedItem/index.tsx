import BreadcrumbItem from '@node-core/ui-components/Common/Breadcrumbs/BreadcrumbItem';

const BreadcrumbTruncatedItem = () => (
  <BreadcrumbItem disableMicrodata>
    <button disabled>…</button>
  </BreadcrumbItem>
);

export default BreadcrumbTruncatedItem;
