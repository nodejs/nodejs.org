import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import type { ComponentProps, FC, PropsWithChildren, ReactNode } from 'react';

import styles from './index.module.css';

type TooltipProps = {
  asChild?: boolean;
  content: ReactNode;
  kind?: 'default' | 'warning' | 'error';
  side?: ComponentProps<typeof TooltipPrimitive.Content>['side'];
};

const Tooltip: FC<PropsWithChildren<TooltipProps>> = ({
  kind = 'default',
  children,
  content,
  asChild = false,
  side = 'bottom',
}) => (
  <TooltipPrimitive.Provider delayDuration={200}>
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild={asChild}>
        {children}
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={side}
          sideOffset={4}
          className={`${styles[kind]} ${styles.content}`}
        >
          {content}
          <TooltipPrimitive.Arrow
            className={styles.arrow}
            width={14}
            height={6}
          />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  </TooltipPrimitive.Provider>
);

export default Tooltip;
