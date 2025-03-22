import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import type { ComponentProps, FC } from 'react';

import Avatar from '@node-core/ui-components/Common/AvatarGroup/Avatar';

import styles from './index.module.css';

export type AvatarOverlayProps = ComponentProps<typeof Avatar> & {
  url?: string;
};

const AvatarOverlay: FC<AvatarOverlayProps> = ({
  image,
  name,
  nickname,
  fallback,
  url,
  as: Component = 'a',
  img,
}) => (
  <Component className={styles.overlay} href={url} target="_blank">
    <Avatar
      image={image}
      name={name}
      nickname={nickname}
      fallback={fallback}
      size="medium"
      img={img}
    />

    <div className={styles.user}>
      {name && <div className={styles.name}>{name}</div>}
      {nickname && <div className={styles.nickname}>{nickname}</div>}
    </div>
    <ArrowUpRightIcon className={styles.arrow} />
  </Component>
);

export default AvatarOverlay;
