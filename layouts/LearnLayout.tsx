import type { FC, PropsWithChildren } from 'react';

import SideNavigation from '@/components/SideNavigation';

import BaseLayout from './BaseLayout';

const LearnLayout: FC<PropsWithChildren> = ({ children }) => (
  <BaseLayout>
    <div className="has-side-nav container">
      <SideNavigation navigationKey="learn" />
      <article dir="auto">{children}</article>
    </div>
  </BaseLayout>
);

export default LearnLayout;
