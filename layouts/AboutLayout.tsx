import type { FC, PropsWithChildren } from 'react';

import SideNavigation from '@/components/SideNavigation';

const AboutLayout: FC<PropsWithChildren> = ({ children }) => (
  <div className="has-side-nav container">
    <SideNavigation navigationKey="about" />
    <article dir="auto">{children}</article>
  </div>
);

export default AboutLayout;
