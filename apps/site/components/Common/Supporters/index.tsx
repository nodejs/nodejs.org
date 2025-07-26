'use client';

import Avatar from '@node-core/ui-components/Common/AvatarGroup/Avatar';
import type { FC } from 'react';
import { use } from 'react';

import type { Supporters } from '#site/types';

type SupportersProps = {
  supporters: Promise<Array<Supporters>>;
};

// TODO: Sort supporters by all time contribution amount and link to their Open Collective page
const SupportersList: FC<SupportersProps> = ({ supporters }) => {
  const supportersList = use(supporters);

  return (
    <div className="flex max-w-full flex-wrap items-center justify-center gap-1">
      {supportersList.map(({ name, image }, i) => (
        <Avatar nickname={name} image={image} key={`${name}-${i}`} />
      ))}
    </div>
  );
};

export default SupportersList;
