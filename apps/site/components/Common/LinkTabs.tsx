import BaseLinkTabs from '@node-core/ui-components/Common/BaseLinkTabs';
import type { LinkTabsProps } from '@node-core/ui-components/Common/BaseLinkTabs';
import type { FC } from 'react';

import Link from '#site/components/Link';

const LinkTabs: FC<Omit<LinkTabsProps, 'as'>> = props => {
  return <BaseLinkTabs as={Link} {...props} />;
};

export default LinkTabs;
