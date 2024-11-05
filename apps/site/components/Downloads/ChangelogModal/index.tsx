'use client';

import { ArrowUpRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import * as Dialog from '@radix-ui/react-dialog';
import { useTranslations } from 'next-intl';
import { useState, useRef } from 'react';
import type { FC, PropsWithChildren } from 'react';

import Link from '@/components/Link';
import WithAvatarGroup from '@/components/withAvatarGroup';

import styles from './index.module.css';

type ChangelogModalProps = PropsWithChildren<{
  heading: string;
  subheading: string;
  avatars: Array<string>;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}>;

const ChangelogModal: FC<ChangelogModalProps> = ({
  heading,
  subheading,
  avatars,
  children,
  open = false,
  onOpenChange = () => {},
}) => {
  const t = useTranslations();
  const ref = useRef<HTMLDivElement>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay}>
          <Dialog.Content
            className={styles.content}
            onOpenAutoFocus={() => setContainer(ref.current)}
          >
            <Dialog.Trigger className={styles.close}>
              <XMarkIcon />
            </Dialog.Trigger>

            <Dialog.Title className={styles.title}>{heading}</Dialog.Title>

            <Dialog.Description className={styles.description}>
              {subheading}
            </Dialog.Description>

            <div className={styles.authors} ref={ref}>
              <WithAvatarGroup
                usernames={avatars}
                isExpandable={false}
                container={container!}
              />

              <Link href="/about/get-involved">
                {t('components.downloads.changelogModal.startContributing')}
                <ArrowUpRightIcon />
              </Link>
            </div>

            <div className={styles.wrapper}>{children}</div>

            <Dialog.Close />
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ChangelogModal;
