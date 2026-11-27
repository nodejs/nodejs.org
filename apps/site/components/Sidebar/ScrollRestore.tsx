'use client';

import { useRef } from 'react';

import useScrollToElement from '#site/hooks/useScrollToElement';

import type { FC } from 'react';

// Preserves the scroll position of the sidebar it is rendered in, which
// is rendered on the server and so cannot hand its `ref` to a hook
const ScrollRestore: FC = () => {
  const sidebarRef = useRef<HTMLElement>(null);

  useScrollToElement('sidebar', sidebarRef);

  return (
    <span
      hidden
      ref={sentinel => {
        sidebarRef.current = sentinel?.parentElement ?? null;
      }}
    />
  );
};

export default ScrollRestore;
