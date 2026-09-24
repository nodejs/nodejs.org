'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';

import type { FC, ButtonHTMLAttributes } from 'react';

import styles from './index.module.css';

type SidebarToggleButtonProps = {
  side: 'left' | 'right';
  isCollapsed: boolean;
  onToggle: () => void;
  ariaLabel?: string;
  title?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const SidebarToggleButton: FC<SidebarToggleButtonProps> = ({
  side,
  isCollapsed,
  onToggle,
  ariaLabel,
  title,
  className,
  ...props
}) => {
  const isLeft = side === 'left';
  const shouldShowRightChevron = isLeft === isCollapsed;

  const icon = shouldShowRightChevron ? (
    <ChevronRightIcon className="size-4" />
  ) : (
    <ChevronLeftIcon className="size-4" />
  );

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={ariaLabel}
      aria-expanded={!isCollapsed}
      title={title}
      className={classNames(styles.button, className)}
      {...props}
    >
      {icon}
    </button>
  );
};

export default SidebarToggleButton;
