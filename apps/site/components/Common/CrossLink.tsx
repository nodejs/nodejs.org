import BaseCrossLink from '@node-core/ui-components/Common/BaseCrossLink';
import type { CrossLinkProps } from '@node-core/ui-components/Common/BaseCrossLink';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import Link from '@/components/Link';

const CrossLink: FC<Omit<CrossLinkProps, 'as' | 'label'>> = props => {
  const t = useTranslations();
  return (
    <BaseCrossLink
      label={t(`components.common.crossLink.${props.type}`)}
      as={Link}
      {...props}
    />
  );
};

export default CrossLink;
