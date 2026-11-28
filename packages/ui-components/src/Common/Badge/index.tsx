import classNames from 'classnames';
import { useId } from 'react';

import type {
  CSSProperties,
  FC,
  HTMLAttributes,
  PropsWithChildren,
} from 'react';

import styles from './index.module.css';

export type BadgeKind = 'default' | 'warning' | 'error' | 'info' | 'neutral';
type BadgeSize = 'small' | 'medium';

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  size?: BadgeSize;
  kind?: BadgeKind;
  'data-tooltip'?: string;
};

const Badge: FC<PropsWithChildren<BadgeProps>> = ({
  kind = 'default',
  size = 'medium',
  className,
  children,
  ...props
}) => {
  const { style, ...rest } = props;
  const tooltip = rest['data-tooltip'];
  // A unique anchor name per badge: anchoring the tooltip to the badge keeps
  // it out of reach of ancestor clipping (scrolling containers), which the
  // global `[data-tooltip]` pseudo-element tooltip suffers from. The same
  // identifier also wires the `aria-describedby` relationship that exposes
  // the stability text to assistive technologies.
  const tooltipAnchorId = useId().replace(/[^a-zA-Z0-9]/g, '');
  const anchorName = `--badge-tooltip-${tooltipAnchorId}`;
  const tooltipId = `badge-tooltip-${tooltipAnchorId}`;

  const badge = (
    <span
      aria-describedby={tooltip ? tooltipId : undefined}
      className={classNames(
        styles.badge,
        styles[kind],
        styles[size],
        {
          [styles.circular]:
            typeof children === 'string' && children.length === 1,
        },
        className
      )}
      style={tooltip ? ({ anchorName, ...style } as CSSProperties) : style}
      {...rest}
    >
      {children}
    </span>
  );

  if (!tooltip) {
    return badge;
  }

  return (
    <>
      {badge}

      <span
        id={tooltipId}
        role="tooltip"
        className={styles.tooltip}
        style={{ positionAnchor: anchorName } as CSSProperties}
      >
        {tooltip}
      </span>
    </>
  );
};

export default Badge;
