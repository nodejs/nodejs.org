'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

import type { FC, ButtonHTMLAttributes } from 'react';

import styles from './SidebarToggleButton.module.css';

type SidebarToggleButtonProps = {
  side: 'left' | 'right';
  isCollapsed: boolean;
  onToggle: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const SidebarToggleButton: FC<SidebarToggleButtonProps> = ({
  side,
  isCollapsed,
  onToggle,
  ...props
}) => {
  const t = useTranslations();

  const icon =
    side === 'left' ? (
      isCollapsed ? (
        <ChevronRightIcon className="size-4" />
      ) : (
        <ChevronLeftIcon className="size-4" />
      )
    ) : isCollapsed ? (
      <ChevronLeftIcon className="size-4" />
    ) : (
      <ChevronRightIcon className="size-4" />
    );

  const label =
    side === 'left'
      ? isCollapsed
        ? t('components.common.sidebar.expandLeftSidebar')
        : t('components.common.sidebar.collapseLeftSidebar')
      : isCollapsed
        ? t('components.common.sidebar.expandRightSidebar')
        : t('components.common.sidebar.collapseRightSidebar');

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={label}
      aria-expanded={!isCollapsed}
      title={label}
      className={styles.toggleButton}
      {...props}
    >
      {icon}
    </button>
  );
};

export default SidebarToggleButton;
