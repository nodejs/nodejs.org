'use server';

import provideSupporters from '#site/next-data/providers/supportersData';

import type { FC, PropsWithChildren } from 'react';

import SupportersList from './Common/Supporters';

const WithSupporters: FC<PropsWithChildren> = async () => {
  const supporters = await provideSupporters();

  return (
    <div className="flex max-w-full flex-wrap items-center gap-1">
      <SupportersList supporters={supporters} />
    </div>
  );
};

export default WithSupporters;
