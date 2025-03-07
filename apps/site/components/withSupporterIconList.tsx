import type { FC } from 'react';

import SupporterIconList from '@/components/Common/Supporters/SupporterIconList';
import supporters from '@/next.supporters.constants';

const WithSupporterIconList: FC = () => (
  <SupporterIconList supporters={supporters} />
);

export default WithSupporterIconList;
