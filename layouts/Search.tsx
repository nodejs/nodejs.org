import type { FC, PropsWithChildren } from 'react';

import WithFooter from '@/components/withFooter';

const SearchLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <main>{children}</main>
    <WithFooter />
  </>
);

export default SearchLayout;
