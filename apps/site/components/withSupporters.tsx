import type { FC, PropsWithChildren } from 'react';

import { fetchOpenCollectiveData } from '#site/next-data/generators/supportersData.mjs';
import type { Supporters } from '#site/types';

import SupportersList from './Common/Supporters';

const WithSupporters: FC<PropsWithChildren> = () => {
  const supporters = fetchOpenCollectiveData() as Promise<Array<Supporters>>;

  return (
    <div className="flex max-w-full flex-wrap items-center justify-center gap-1">
      <SupportersList supporters={supporters} />
    </div>
  );
};

export default WithSupporters;
