import type { FC, PropsWithChildren } from 'react';

import WithFooter from '@/components/withFooter';
import WithNavBar from '@/components/withNavBar';

const DefaultLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <WithNavBar />

    <div className="mdxContent">{children}</div>

    <WithFooter />
  </>
);

export default DefaultLayout;
