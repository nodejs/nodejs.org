'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import * as Dialog from '@radix-ui/react-dialog';
import type { FC, PropsWithChildren } from 'react';

import styles from './index.module.css';

type ModalProps = PropsWithChildren<{
  heading: string;
  subheading?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}>;

const Modal: FC<ModalProps> = ({
  heading,
  subheading,
  children,
  open = false,
  onOpenChange = () => {},
}) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className={styles.overlay}>
        <Dialog.Content className={styles.content}>
          <Dialog.Trigger className={styles.close}>
            <XMarkIcon />
          </Dialog.Trigger>

          <Dialog.Title className={styles.title}>{heading}</Dialog.Title>

          {subheading && (
            <Dialog.Description className={styles.description}>
              {subheading}
            </Dialog.Description>
          )}

          <main className={styles.wrapper}>{children}</main>

          <Dialog.Close />
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  </Dialog.Root>
);

export default Modal;
