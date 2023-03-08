import type { PropsWithChildren } from 'react';

import BaseLayout from './BaseLayout';
import SideNavigation from '../components/SideNavigation';

const AboutLayout = ({ children }: PropsWithChildren) => (
  <BaseLayout>
    <div className="container has-side-nav">
      <SideNavigation navigationKey="about" />
      <article dir="auto">{children}</article>
    </div>
  </BaseLayout>
);

export default AboutLayout;
