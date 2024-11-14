import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import type { ComponentProps, FC } from 'react';

import Avatar from '@node-core/ui-components/Common/AvatarGroup/Avatar';
import type { LinkLike } from '@node-core/ui-components/types';

import styles from './index.module.css';

export type AvatarOverlayProps = ComponentProps<typeof Avatar> & {
  url?: string;
  Wrapper: LinkLike;
};

const AvatarOverlay: FC<AvatarOverlayProps> = ({
  image,
  name,
  nickname,
  fallback,
  url,
  Wrapper = 'a',
}) => (
  <Wrapper className={styles.overlay} href={url} target="_blank">
    <Avatar
      image={image}
      name={name}
      nickname={nickname}
      fallback={fallback}
      size="medium"
      Wrapper={Wrapper}
    />
    <div className={styles.user}>
      {name && <div className={styles.name}>{name}</div>}
      {nickname && <div className={styles.nickname}>{nickname}</div>}
    </div>
    <ArrowUpRightIcon className={styles.arrow} />
  </Wrapper>
);

export default AvatarOverlay;
