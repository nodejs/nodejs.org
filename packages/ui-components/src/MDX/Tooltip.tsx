import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import classNames from 'classnames';
import type { FC, HTMLAttributes, PropsWithChildren } from 'react';

import styles from '#ui/Common/Tooltip/index.module.css';

export const MDXTooltip: FC<PropsWithChildren> = ({ children, ...props }) => (
  <TooltipPrimitive.Provider delayDuration={100}>
    <TooltipPrimitive.Root {...props}>{children}</TooltipPrimitive.Root>
  </TooltipPrimitive.Provider>
);

export const MDXTooltipTrigger: FC<PropsWithChildren> = ({
  children,
  ...props
}) => (
  <TooltipPrimitive.Trigger {...props}>{children}</TooltipPrimitive.Trigger>
);

export const MDXTooltipContent: FC<
  PropsWithChildren<HTMLAttributes<HTMLElement>>
> = ({ children, ...props }) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      side={'bottom'}
      sideOffset={4}
      {...props}
      className={classNames(props.className, styles.default, styles.content)}
    >
      {children}
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
);
