'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import * as Dialog from '@radix-ui/react-dialog';

import type { FC, PropsWithChildren } from 'react';

import styles from './index.module.css';

type ModalProps = PropsWithChildren<{
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}>;

const Modal: FC<ModalProps> = ({
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

          {children}

          <Dialog.Close />
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  </Dialog.Root>
);

const Title = ({ children }: PropsWithChildren) => (
  <Dialog.Title className={styles.title}>{children}</Dialog.Title>
);

const Description = ({ children }: PropsWithChildren) => (
  <Dialog.Description className={styles.description}>
    {children}
  </Dialog.Description>
);

const Content = ({ children }: PropsWithChildren) => (
  <main className={styles.wrapper}>{children}</main>
);

export { Modal, Title, Description, Content };
