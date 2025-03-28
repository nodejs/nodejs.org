import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';
import { type FC, type RefObject } from 'react';

import styles from '@node-core/ui-components/Common/Select/index.module.css';

type SelectScrollButtonProps = {
  direction: 'up' | 'down';
  selectContentRef?: RefObject<HTMLDivElement | null>;
  scrollAmount?: number;
  scrollInterval?: number;
};

const SelectScrollButton: FC<SelectScrollButtonProps> = ({
  direction,
  selectContentRef,
  scrollAmount = 35,
  scrollInterval = 50,
}) => {
  const DirectionComponent =
    direction === 'down' ? ChevronDownIcon : ChevronUpIcon;
  const [isVisible, setIsVisible] = useState(false);
  const [hasOverflow, setOverflow] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const isScrollingRef = useRef(false);

  const clearScrollInterval = () => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startScrolling = () => {
    if (!selectContentRef?.current || !isVisible || !hasOverflow) return;

    clearScrollInterval();

    intervalRef.current = window.setInterval(() => {
      if (!selectContentRef.current || !isScrollingRef.current) return;

      const container = selectContentRef.current;

      if (direction === 'down') {
        container.scrollBy({ top: scrollAmount, behavior: 'smooth' });

        if (
          container.scrollTop >=
          container.scrollHeight - container.clientHeight
        ) {
          clearScrollInterval();
          setIsVisible(false);
        }
      } else {
        container.scrollBy({
          top: -Math.abs(scrollAmount),
          behavior: 'smooth',
        });

        if (container.scrollTop <= 0) {
          clearScrollInterval();
          setIsVisible(false);
        }
      }
    }, scrollInterval);
  };

  useEffect(() => {
    if (!selectContentRef?.current) return;

    const container = selectContentRef.current;
    setOverflow(container.scrollHeight > container.clientHeight);

    const updateButtonVisibility = () => {
      if (!container) return;

      if (direction === 'down') {
        setIsVisible(
          container.scrollTop < container.scrollHeight - container.clientHeight
        );
      } else {
        setIsVisible(container.scrollTop > 0);
      }
    };

    updateButtonVisibility();

    const handleScroll = () => {
      updateButtonVisibility();

      if (!isScrollingRef.current && intervalRef.current !== null) {
        clearScrollInterval();
      }
    };

    container.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateButtonVisibility);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateButtonVisibility);
      clearScrollInterval();
    };
  }, [direction, selectContentRef]);

  const handleMouseEnter = () => {
    isScrollingRef.current = true;
    startScrolling();
  };

  const handleMouseLeave = () => {
    isScrollingRef.current = false;
    clearScrollInterval();
  };

  if (!isVisible) return null;

  return (
    <div
      className={styles.scrollBtn}
      data-direction={direction}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <DirectionComponent className={styles.scrollBtnIcon} aria-hidden="true" />
    </div>
  );
};

export default SelectScrollButton;
