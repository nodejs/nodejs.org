'use client';

import type { FC } from 'react';

import SupporterLogoList from '@/components/Common/Supporters/SupporterLogoList';
import supporters from '@/next.supporters.constants';

type WithSupporterLogoListProps = {
  supporterNames: Array<string>;
};

const WithSupporterLogoList: FC<WithSupporterLogoListProps> = ({
  supporterNames,
}) => (
  <SupporterLogoList
    supporters={supporters
      .filter(({ name }) => supporterNames.includes(name))
      .slice(0, 3)}
  />
);

export default WithSupporterLogoList;
