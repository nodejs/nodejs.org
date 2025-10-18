import Avatar from '@node-core/ui-components/Common/AvatarGroup/Avatar';
import type { FC } from 'react';

import type { Supporters } from '#site/types';

type SupportersListProps = {
  supporters: Array<Supporters>;
};

const SupportersList: FC<SupportersListProps> = ({ supporters }) => (
  <div className="flex max-w-full flex-wrap items-center justify-center gap-1">
    {supporters.map(({ name, image, profile }, i) => (
      <Avatar
        nickname={name}
        image={image}
        key={`${name}-${i}`}
        url={profile}
      />
    ))}
  </div>
);

export default SupportersList;
