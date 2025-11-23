import BaseLinkTabs from '@node-core/ui-components/Common/BaseLinkTabs';

import Link from '#site/components/Link';

import type { LinkTabsProps } from '@node-core/ui-components/Common/BaseLinkTabs';
import type { FC } from 'react';

const LinkTabs: FC<Omit<LinkTabsProps, 'as'>> = props => {
  return <BaseLinkTabs as={Link} {...props} />;
};

export default LinkTabs;
