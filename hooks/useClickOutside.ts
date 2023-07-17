import { useEffect, useRef } from 'react';

type UseClickOutsideHandler = (_event: MouseEvent | TouchEvent) => void;

export const useClickOutside = <T extends HTMLElement>(
  handler: UseClickOutsideHandler,
  buttonRef: React.RefObject<HTMLButtonElement>
) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (
        ref.current &&
        buttonRef.current &&
        !ref.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        handler(event);
      }
    };

    document.addEventListener('click', listener, true);

    return () => document.removeEventListener('click', listener);
  }, [ref, handler, buttonRef]);
  return ref;
};
