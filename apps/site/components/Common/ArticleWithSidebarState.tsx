'use client';

import Article from '@node-core/ui-components/Containers/Article';

import { useSidebarState } from '#site/providers/sidebarStateProvider';

import type { FC, PropsWithChildren } from 'react';

const ArticleWithSidebarState: FC<PropsWithChildren> = ({ children }) => {
  const { isLeftSidebarCollapsed, isRightSidebarCollapsed } = useSidebarState();

  return (
    <Article
      data-left-sidebar-collapsed={isLeftSidebarCollapsed ? 'true' : 'false'}
      data-right-sidebar-collapsed={isRightSidebarCollapsed ? 'true' : 'false'}
    >
      {children}
    </Article>
  );
};

export default ArticleWithSidebarState;
