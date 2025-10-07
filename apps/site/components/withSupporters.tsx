'use server';

import type { FC, PropsWithChildren } from 'react';

import SupportersList from './Common/Supporters';

import provideSupporters from '#site/next-data/providers/supportersData';

const WithSupporters: FC<PropsWithChildren> = () => {
  const supporters = provideSupporters();

  return (
    <div className="flex max-w-full flex-wrap items-center gap-1">
      <SupportersList supporters={supporters} />
    </div>
  );
};

export default WithSupporters;
