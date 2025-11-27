import BaseCrossLink from '@node-core/ui-components/Common/BaseCrossLink';
import { useTranslations } from 'next-intl';

import Link from '#site/components/Link';

import type { CrossLinkProps } from '@node-core/ui-components/Common/BaseCrossLink';
import type { FC } from 'react';

const CrossLink: FC<Omit<CrossLinkProps, 'as' | 'label'>> = props => {
  const t = useTranslations();
  return (
    <BaseCrossLink
      label={t(`components.common.pagination.${props.type}`)}
      as={Link}
      {...props}
    />
  );
};

export default CrossLink;
