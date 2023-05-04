import { useEffect } from 'react';
import type { RefObject } from 'react';

// eslint-disable-next-line no-unused-vars
type TypeHandler = (_event: MouseEvent | TouchEvent) => void;

type UseClickOutsideProps = {
  ref: RefObject<HTMLElement>;
  handler: TypeHandler;
};

export const useClickOutside = (props: UseClickOutsideProps) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (
        !props.ref.current ||
        props.ref.current.contains(event.target as Node)
      ) {
        return;
      }
      props.handler(event);
    };

    document.addEventListener('mousedown', listener, true);
    document.addEventListener('touchstart', listener, true);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.ref, props.handler]);
};
