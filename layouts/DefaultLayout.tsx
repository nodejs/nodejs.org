import BaseLayout from './BaseLayout';
import type { PropsWithChildren } from 'react';

const DefaultLayout = (props: PropsWithChildren) => (
  <BaseLayout>
    <div className="container">{props.children}</div>
  </BaseLayout>
);

export default DefaultLayout;
