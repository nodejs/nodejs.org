import type { FC, PropsWithChildren } from 'react';

import WithBreadcrumbs from '@/components/withBreadcrumbs';
import WithMetaBar from '@/components/withMetaBar';
import ArticleLayout from '@/layouts/Article';

const AboutLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <ArticleLayout>
      <main>
        <article>{children}</article>
      </main>

      <WithMetaBar />

      <WithBreadcrumbs />
    </ArticleLayout>
  </>
);

export default AboutLayout;
