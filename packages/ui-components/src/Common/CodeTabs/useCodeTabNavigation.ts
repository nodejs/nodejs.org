import { useRef, useSyncExternalStore } from 'react';

import type { KeyboardEvent, MouseEvent } from 'react';

const subscribe = (onChange: () => void) => {
  window.addEventListener('hashchange', onChange);
  return () => window.removeEventListener('hashchange', onChange);
};

const getSnapshot = () => window.location.hash;
const getServerSnapshot = () => null;

// CSS owns visibility. This enhancement keeps ARIA and keyboard navigation
// aligned with the URL, including browser Back/Forward and external links.
export function useCodeTabNavigation(ids: Array<string>, defaultIndex: number) {
  const hash = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const linksRef = useRef<Array<HTMLAnchorElement | null>>([]);
  const targetedIndex = ids.findIndex(id => `#${id}` === hash);
  const activeIndex = targetedIndex < 0 ? defaultIndex : targetedIndex;

  const activate = (index: number) => {
    window.location.hash = ids[index];
    linksRef.current[index]?.focus({ preventScroll: true });
  };

  const onClick = (event: MouseEvent<HTMLAnchorElement>, index: number) => {
    if (
      event.button ||
      event.metaKey ||
      event.ctrlKey ||
      event.altKey ||
      event.shiftKey
    ) {
      return;
    }
    event.preventDefault();
    activate(index);
  };

  const onKeyDown = (
    event: KeyboardEvent<HTMLAnchorElement>,
    index: number
  ) => {
    const nextIndex = {
      ArrowRight: (index + 1) % ids.length,
      ArrowLeft: (index + ids.length - 1) % ids.length,
      Home: 0,
      End: ids.length - 1,
      ' ': index,
    }[event.key];

    if (nextIndex !== undefined) {
      event.preventDefault();
      activate(nextIndex);
    }
  };

  return { enhanced: hash !== null, activeIndex, linksRef, onClick, onKeyDown };
}
