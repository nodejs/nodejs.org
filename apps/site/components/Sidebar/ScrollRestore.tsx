'use client';

import { useLayoutEffect, useRef } from 'react';

import useScrollToElement from '#site/hooks/useScrollToElement';

import type { FC } from 'react';

// Preserves the scroll position of the sidebar it is rendered in
const ScrollRestore: FC = () => {
  const sentinelRef = useRef<HTMLElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);

  // Runs before the effects of `useScrollToElement`, which read the ref
  useLayoutEffect(() => {
    sidebarRef.current = sentinelRef.current?.parentElement ?? null;
  }, []);

  useScrollToElement('sidebar', sidebarRef);

  return <span ref={sentinelRef} hidden />;
};

export default ScrollRestore;
