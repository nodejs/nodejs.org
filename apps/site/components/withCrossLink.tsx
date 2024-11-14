import CrossLink from '@node-core/ui-components/Common/CrossLink';
import type { CrossLinkProps } from '@node-core/ui-components/Common/CrossLink';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import Link from '@/components/Link';

type WithCrossLinkProps = Omit<CrossLinkProps, 'Wrapper' | 'label'>;

const WithCrossLink: FC<WithCrossLinkProps> = props => {
  const t = useTranslations();
  return (
    <CrossLink
      label={t(`components.common.crossLink.${props.type}`)}
      Wrapper={Link}
      {...props}
    />
  );
};

export default WithCrossLink;
