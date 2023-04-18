import BaseLayout from './BaseLayout';
import SideNavigation from '../components/SideNavigation';
import type { PropsWithChildren } from 'react';

const AboutLayout = (props: PropsWithChildren) => (
  <BaseLayout>
    <div className="container has-side-nav">
      <SideNavigation navigationKey="about" />
      <article dir="auto">{props.children}</article>
    </div>
  </BaseLayout>
);

export default AboutLayout;
