import TableOfContents from '@node-core/ui-components/Common/TableOfContents';
import { useTranslations } from 'next-intl';

import type { FC } from 'react';

import { useClientContext } from '../hooks/server';

const WithTOC: FC = () => {
  const { headings } = useClientContext();
  const t = useTranslations();

  return (
    <TableOfContents
      headings={headings}
      summaryTitle={t('components.common.onThisPage')}
    />
  );
};

export default WithTOC;
