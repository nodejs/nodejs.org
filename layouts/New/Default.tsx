import type { FC, PropsWithChildren } from 'react';

import WithFooter from '@/components/withFooter';
import WithNavBar from '@/components/withNavBar';

const DefaultLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <WithNavBar />

    {children}

    <WithFooter />
  </>
);

export default DefaultLayout;
