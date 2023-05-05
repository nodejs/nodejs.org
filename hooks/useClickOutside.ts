import { useEffect, useRef } from 'react';

type useClickOutsideType = (
  // eslint-disable-next-line no-unused-vars
  event: MouseEvent | TouchEvent
) => void;

export const useClickOutside = <T extends HTMLElement>(
  handler: useClickOutsideType
) => {
  const ref = useRef<T>(null);
  const clickEvent = 'ontouchstart' in window ? 'touchstart' : 'click';
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref?.current;
      if (!el || el.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener(clickEvent, listener, true);
    return () => {
      document.removeEventListener(clickEvent, listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, handler]);
  return ref;
};
