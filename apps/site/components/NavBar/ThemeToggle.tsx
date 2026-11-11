'use client';

import Skeleton from '@node-core/ui-components/Common/Skeleton';
import styles from '@node-core/ui-components/Containers/NavBar/index.module.css';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';

import type { Theme } from '@node-core/ui-components/Common/ThemeToggle';
import type { FC } from 'react';

const ThemeToggleContainer = dynamic(
  () => import('@node-core/ui-components/Common/ThemeToggle'),
  {
    ssr: false,
    loading: () => (
      <Skeleton className={styles.themeToggleSkeleton} loading={true} />
    ),
  }
);

type ThemeToggleProps = {
  ariaLabel: string;
  themeLabels: Record<Theme, string>;
};

const ThemeToggle: FC<ThemeToggleProps> = props => {
  const { theme, setTheme } = useTheme();

  return (
    <ThemeToggleContainer
      onChange={setTheme}
      currentTheme={(theme as Theme) ?? 'system'}
      {...props}
    />
  );
};

export default ThemeToggle;
