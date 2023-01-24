import type { PropsWithChildren } from 'react';

import BaseLayout from './BaseLayout';

const DefaultLayout = ({ children }: PropsWithChildren) => (
  <BaseLayout>
    <div className="container">{children}</div>
  </BaseLayout>
);

export default DefaultLayout;
