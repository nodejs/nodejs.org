import type { FC, PropsWithChildren } from 'react';

import BaseLayout from '@/layouts/BaseLayout';

const IndexLayout: FC<PropsWithChildren> = ({ children }) => (
  <BaseLayout>
    <div className="container">
      <div id="home-intro">{children}</div>
    </div>
  </BaseLayout>
);

export default IndexLayout;
