import { useState, useEffect } from 'react';

export interface ElementPositionAndSize {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const useElementPositionAndSize = <T extends HTMLElement>(
  elementRef: React.RefObject<T>
) => {
  const [position, setPosition] = useState<ElementPositionAndSize>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const getPosition = () => {
    if (elementRef.current) {
      const x = elementRef.current.offsetLeft || 0;
      const y = elementRef.current.offsetTop || 0;
      const width = elementRef.current.offsetWidth || 0;
      const height = elementRef.current.offsetHeight || 0;

      setPosition({ x, y, width, height });
    }
  };

  useEffect(() => getPosition(), [elementRef.current]);

  useEffect(() => {
    window.addEventListener('resize', getPosition, { passive: true });

    return () => window.removeEventListener('resize', getPosition);
  }, []);

  return position;
};
