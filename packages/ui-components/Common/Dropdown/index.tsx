import classNames from 'classnames';
import type { FC, ComponentProps, PropsWithChildren, HTMLProps } from 'react';

import type { LinkLike } from '#ui/types.js';

import styles from './index.module.css';

type DropdownProps = ComponentProps<'div'> & {
  values: Array<HTMLProps<HTMLAnchorElement | HTMLDivElement>>;
  as?: LinkLike;
};

const Dropdown: FC<PropsWithChildren<DropdownProps>> = ({
  values = [],
  className,
  as: As = 'a',
  'aria-label': ariaLabel,
  children,
  ...props
}) => (
  <div className={classNames('relative', 'inline-block', className)} {...props}>
    <details className="group">
      <summary className={styles.summary} role="button" aria-haspopup="menu">
        {children}
      </summary>
      <div
        className={styles.dropdownContentWrapper}
        role="menu"
        aria-label={ariaLabel}
      >
        <div className={styles.dropdownContentInner}>
          {values.map((value, index) => {
            if (value.href) {
              return (
                <As
                  key={index}
                  role="menuitem"
                  tabIndex={0}
                  {...(value as ComponentProps<LinkLike>)}
                  className={classNames(styles.dropdownItem, value.className)}
                />
              );
            } else {
              return (
                <div
                  key={index}
                  role="menuitem"
                  tabIndex={0}
                  {...(value as HTMLProps<HTMLDivElement>)}
                  className={classNames(styles.dropdownItem, value.className)}
                />
              );
            }
          })}
        </div>
      </div>
    </details>
  </div>
);

export default Dropdown;
