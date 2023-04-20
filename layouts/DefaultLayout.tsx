import BaseLayout from './BaseLayout';
import type { FC, PropsWithChildren } from 'react';

const DefaultLayout: FC<PropsWithChildren> = ({ children }) => (
  <BaseLayout>
    <div className="container">{children}</div>
  </BaseLayout>
);

export default DefaultLayout;
