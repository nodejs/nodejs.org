'use client';

import type { FC, PropsWithChildren } from 'react';

type CollapsedSidebarRailProps = {
  side: 'left' | 'right';
};

const CollapsedSidebarRail: FC<
  PropsWithChildren<CollapsedSidebarRailProps>
> = ({ side, children }) => {
  return (
    <aside
      className={`flex w-full flex-col bg-white transition-all duration-200 ease-out dark:bg-neutral-950 ${
        side === 'left'
          ? 'border-r border-neutral-200 dark:border-neutral-900'
          : 'border-l border-neutral-200 dark:border-neutral-900'
      }`}
    >
      {/* Button container positioned at top with proper spacing */}
      <div className="flex w-full justify-center px-3 pt-6">{children}</div>
    </aside>
  );
};

export default CollapsedSidebarRail;
