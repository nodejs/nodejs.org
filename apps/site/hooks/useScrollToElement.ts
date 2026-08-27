'use client';

import { use, useEffect } from 'react';

import { NavigationStateContext } from '#site/providers/navigationStateProvider';

import type { RefObject } from 'react';

import useScroll from './useScroll';

const useScrollToElement = <T extends HTMLElement>(
  id: string,
  ref: RefObject<T | null>,
  pathname?: string,
  debounceTime = 300
) => {
  const navigationState = use(NavigationStateContext);

  // Restore scroll position and keep the active link visible
  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    // Restore scroll position if saved state exists
    const savedState = navigationState[id];

    // Scroll only if the saved position differs from current
    if (savedState && savedState.y !== element.scrollTop) {
      element.scroll({ top: savedState.y, behavior: 'auto' });
    }

    if (!pathname) {
      return;
    }

    // usePathname can omit the locale prefix, so compare resolved anchor paths
    // against both the app pathname and the browser location.
    const activeElement = Array.from(
      element.querySelectorAll<HTMLAnchorElement>('a[href]')
    ).find(
      ({ origin, pathname: linkPathname }) =>
        origin === window.location.origin &&
        (linkPathname === window.location.pathname || linkPathname === pathname)
    );

    if (!activeElement) {
      return;
    }

    const activeRect = activeElement.getBoundingClientRect();
    const containerRect = element.getBoundingClientRect();
    const offsetTop = activeRect.top - containerRect.top + element.scrollTop;
    const viewTop = element.scrollTop;
    const viewBottom = viewTop + element.clientHeight;

    if (
      offsetTop >= viewTop &&
      offsetTop + activeElement.offsetHeight <= viewBottom
    ) {
      return;
    }

    element.scroll({
      top: Math.max(
        0,
        offsetTop - element.clientHeight / 2 + activeElement.offsetHeight / 2
      ),
      behavior: 'auto',
    });
    // navigationState is intentionally excluded
    // it's a stable object reference that doesn't need to trigger re-runs
    // eslint-disable-next-line @eslint-react/exhaustive-deps
  }, [id, pathname, ref]);

  // Save scroll position on scroll
  const handleScroll = (position: { x: number; y: number }) => {
    // Save the current scroll position in the navigation state
    const state = navigationState as Record<string, { x: number; y: number }>;
    state[id] = position;
  };

  // Use the useScroll hook to handle scroll events with debouncing
  useScroll(ref, { debounceTime, onScroll: handleScroll });
};

export default useScrollToElement;
