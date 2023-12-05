import type { FC, PropsWithChildren } from 'react';

import SideNavigation from '@/components/SideNavigation';

const LearnLayout: FC<PropsWithChildren> = ({ children }) => (
  <div className="has-side-nav container">
    <SideNavigation navigationKeys={['learn']} />
    <article dir="auto">{children}</article>
  </div>
);

export default LearnLayout;
