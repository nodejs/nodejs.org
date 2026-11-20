'use client';

import {
  useRef,
  useEffect,
  type FC,
  type ComponentProps,
  type ReactNode,
} from 'react';

type ChangeHistoryDetailsProps = ComponentProps<'details'> & {
  children?: ReactNode;
};

export const ChangeHistoryDetails: FC<ChangeHistoryDetailsProps> = ({
  children,
  ...props
}) => {
  const detailsRef = useRef<HTMLDetailsElement | null>(null);

  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      const details = detailsRef.current;
      if (details && details.open && !details.contains(e.target as Node)) {
        details.removeAttribute('open');
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  return (
    <details ref={detailsRef} {...props}>
      {children}
    </details>
  );
};
