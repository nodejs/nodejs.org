import * as Dialog from '@radix-ui/react-dialog';
import type { FC, PropsWithChildren, ReactNode, ComponentProps } from 'react';

import AvatarGroup from '@/components/Common/AvatarGroup';
// TODO: Add styling
// import styles from './index.module.css';
import Link from '@/components/Link';

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
}) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content>
          <Dialog.Title>{heading}</Dialog.Title>
          <Dialog.Description>{subheading}</Dialog.Description>
          <div>
            <AvatarGroup avatars={avatars} />
            <Link href="/get-involved">Start Contributing</Link>
          </div>
          {children}
          <Dialog.Close />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ChangelogModal;
