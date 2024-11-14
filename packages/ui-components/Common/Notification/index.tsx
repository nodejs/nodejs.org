import * as ToastPrimitive from '@radix-ui/react-toast';
import classNames from 'classnames';
import type { FC } from 'react';

import styles from './index.module.css';

type NotificationProps = {
  open?: boolean;
  duration?: number;
  onChange?: (value: boolean) => void;
  children?: React.ReactNode;
  className?: string;
};

const Notification: FC<NotificationProps> = ({
  open,
  duration = 5000,
  onChange,
  children,
  className,
}: NotificationProps) => (
  <ToastPrimitive.Root
    open={open}
    duration={duration}
    onOpenChange={onChange}
    className={classNames(styles.root, className)}
  >
    <ToastPrimitive.Title className={styles.message}>
      {children}
    </ToastPrimitive.Title>
  </ToastPrimitive.Root>
);

export default Notification;
