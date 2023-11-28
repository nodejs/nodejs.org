import type { FC, PropsWithChildren } from 'react';

import WithFooter from '@/layouts/New/withFooter';
import WithNavBar from '@/layouts/New/withNavBar';

const DefaultLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <WithNavBar />

    {children}

    <WithFooter />
  </>
);

export default DefaultLayout;
