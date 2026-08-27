'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

import type { FC, ButtonHTMLAttributes } from 'react';

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
      className="flex size-8 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-700 shadow-sm transition-all duration-200 ease-out hover:bg-neutral-50 hover:shadow-md focus:ring-2 focus:ring-neutral-400 focus:ring-offset-1 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:shadow-neutral-900/20 dark:hover:bg-neutral-700 dark:focus:ring-neutral-500"
      {...props}
    >
      {icon}
    </button>
  );
};

export default SidebarToggleButton;
