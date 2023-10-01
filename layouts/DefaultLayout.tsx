import type { FC, PropsWithChildren } from 'react';

import BaseLayout from './BaseLayout';

const DefaultLayout: FC<PropsWithChildren> = ({ children }) => (
  <BaseLayout>
    <div className="container">{children}</div>
  </BaseLayout>
);

export default DefaultLayout;
