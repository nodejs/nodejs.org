'use client';

import { useEffect, useRef, type FC } from 'react';

import HexagonGrid from '#ui/Icons/HexagonGrid';

import styles from './index.module.css';

const GlowingBackdrop: FC = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    let lastTime = 0;
    const throttle = 50; // Create trail every 50ms

    const createTrail = (x: number, y: number) => {
      if (!containerRef.current) {
        return;
      }

      const trail = document.createElement('div');
      trail.className = styles.cursorTrail;
      trail.style.left = `${x - 6}px`;
      trail.style.top = `${y - 6}px`;

      containerRef.current.appendChild(trail);

      // Remove after animation completes
      setTimeout(() => {
        trail.remove();
      }, 600);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (glowRef.current && containerRef.current) {
        // Get container boundaries
        const rect = containerRef.current.getBoundingClientRect();

        // Clamp cursor position within container bounds
        const clampedX = Math.max(
          0,
          Math.min(e.clientX - rect.left, rect.width)
        );
        const clampedY = Math.max(
          0,
          Math.min(e.clientY - rect.top, rect.height)
        );

        const x = clampedX - 300; // Center the glow
        const y = clampedY - 300; // Center the glow

        glowRef.current.style.transform = `translate(${x}px, ${y}px)`;
        glowRef.current.style.opacity = '1';

        // Throttle trail creation
        const currentTime = Date.now();
        if (currentTime - lastTime > throttle) {
          createTrail(clampedX, clampedY);
          lastTime = currentTime;
        }
      }
    };

    const handleMouseLeave = () => {
      if (glowRef.current) {
        glowRef.current.style.opacity = '0';
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!containerRef.current) {
        return;
      }

      // Get container boundaries
      const rect = containerRef.current.getBoundingClientRect();

      // Clamp click position within container bounds
      const clampedX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const clampedY = Math.max(0, Math.min(e.clientY - rect.top, rect.height));

      const ripple = document.createElement('div');
      ripple.className = styles.ripple;
      ripple.style.left = `${clampedX - 150}px`;
      ripple.style.top = `${clampedY - 150}px`;

      containerRef.current.appendChild(ripple);

      // Remove after animation completes
      setTimeout(() => {
        ripple.remove();
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.glowingBackdrop}>
      <HexagonGrid />
      <div ref={glowRef} className={styles.cursorGlow} />
    </div>
  );
};

export default GlowingBackdrop;
