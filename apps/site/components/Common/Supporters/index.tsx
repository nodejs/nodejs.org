import Avatar from '@node-core/ui-components/Common/AvatarGroup/Avatar';

import type { Supporter } from '#site/types';
import type { FC } from 'react';

type SupportersListProps = {
  supporters: Array<Supporter<'opencollective'>>;
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
