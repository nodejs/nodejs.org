import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import classNames from 'classnames';
import type { ComponentProps, FC, PropsWithChildren, ReactNode } from 'react';

import styles from './index.module.css';

type TooltipProps = {
  asChild?: boolean;
  content: ReactNode;
  kind?: 'default' | 'warning' | 'error';
  side?: ComponentProps<typeof TooltipPrimitive.Content>['side'];
  container?: HTMLElement | null;
};

const Tooltip: FC<PropsWithChildren<TooltipProps>> = ({
  kind = 'default',
  children,
  content,
  asChild = false,
  side = 'bottom',
  container,
}) => (
  <TooltipPrimitive.Provider delayDuration={200}>
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild={asChild}>
        {children}
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal container={container}>
        <TooltipPrimitive.Content
          side={side}
          sideOffset={4}
          className={classNames(styles[kind], styles.content, {
            'mx-1.5': side === 'top' || side === 'bottom',
          })}
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
