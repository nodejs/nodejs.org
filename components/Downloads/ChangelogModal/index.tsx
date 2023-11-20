import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import * as Dialog from '@radix-ui/react-dialog';
import type { FC, PropsWithChildren, ReactNode, ComponentProps } from 'react';

import AvatarGroup from '@/components/Common/AvatarGroup';
import Link from '@/components/Link';

import styles from './index.module.css';

type ChangelogModalProps = {
  heading: string;
  subheading: string;
  avatars: ComponentProps<typeof AvatarGroup>['avatars'];
  trigger: ReactNode;
  children: ReactNode;
};

const ChangelogModal: FC<PropsWithChildren<ChangelogModalProps>> = ({
  heading,
  subheading,
  avatars,
  trigger,
  children,
}) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className={styles.dialogOverlay}>
        <Dialog.Content className={styles.dialogContent}>
          <Dialog.Title className={styles.dialogTitle}>{heading}</Dialog.Title>
          <Dialog.Description className={styles.dialogDescription}>
            {subheading}
          </Dialog.Description>
          <div className={styles.authorsContainer}>
            <AvatarGroup avatars={avatars} />
            <Link href="/get-involved" className={styles.contributorLink}>
              Start Contributing
            </Link>
            <ArrowUpRightIcon />
          </div>
          {children}
          <Dialog.Close />
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  </Dialog.Root>
);

export default ChangelogModal;
