import type { FC, PropsWithChildren } from 'react';

import WithFooter from '@/components/withFooter';
import WithNavBar from '@/components/withNavBar';

const SearchLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <WithNavBar />
    <main>{children}</main>
    <WithFooter />
  </>
);

export default SearchLayout;
