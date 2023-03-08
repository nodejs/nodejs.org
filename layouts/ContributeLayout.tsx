import type { PropsWithChildren } from 'react';

import BaseLayout from './BaseLayout';
import SideNavigation from '../components/SideNavigation';

const ContributeLayout = ({ children }: PropsWithChildren) => (
  <BaseLayout>
    <div className="container has-side-nav">
      <SideNavigation navigationKey="getInvolved" />
      <article dir="auto">{children}</article>
    </div>
  </BaseLayout>
);

export default ContributeLayout;
