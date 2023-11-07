import type { FC, PropsWithChildren } from 'react';

import SideNavigation from '@/components/SideNavigation';

const ContributeLayout: FC<PropsWithChildren> = ({ children }) => (
  <div className="has-side-nav container">
    <SideNavigation navigationKey="getInvolved" />
    <article dir="auto">{children}</article>
  </div>
);

export default ContributeLayout;
