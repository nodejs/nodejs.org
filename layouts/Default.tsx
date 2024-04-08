import type { FC, PropsWithChildren } from 'react';

import WithFooter from '@/components/withFooter';
import ArticleLayout from '@/layouts/Article';

const DefaultLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <ArticleLayout>
      <main>{children}</main>
    </ArticleLayout>

    <WithFooter />
  </>
);

export default DefaultLayout;
