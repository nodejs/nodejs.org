import * as SeparatorPrimitive from '@radix-ui/react-separator';
import classNames from 'classnames';
import type { FC, ComponentProps } from 'react';

import styles from './index.module.css';

const Separator: FC<ComponentProps<typeof SeparatorPrimitive.Root>> = ({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}) => (
  <SeparatorPrimitive.Root
    decorative={decorative}
    orientation={orientation}
    className={classNames(
      styles.root,
      orientation === 'horizontal' ? styles.horizontal : styles.vertical,
      className
    )}
    {...props}
  />
);

export default Separator;
