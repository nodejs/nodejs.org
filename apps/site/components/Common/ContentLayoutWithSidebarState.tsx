'use client';

import { useSidebarState } from '#site/providers/sidebarStateProvider';

import type { FC, PropsWithChildren } from 'react';

type ContentLayoutWithSidebarStateProps = {
  className?: string;
};

const ContentLayoutWithSidebarState: FC<
  PropsWithChildren<ContentLayoutWithSidebarStateProps>
> = ({ children, className = '' }) => {
  const { isLeftSidebarCollapsed, isRightSidebarCollapsed } = useSidebarState();

  return (
    <div
      className={className}
      data-left-sidebar-collapsed={isLeftSidebarCollapsed ? 'true' : 'false'}
      data-right-sidebar-collapsed={isRightSidebarCollapsed ? 'true' : 'false'}
    >
      {children}
    </div>
  );
};

export default ContentLayoutWithSidebarState;
