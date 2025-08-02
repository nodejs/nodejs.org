'use client';

import WithNoScriptSelect from '@node-core/ui-components/Common/Select/NoScriptSelect';
import type { ComponentProps, FC } from 'react';

import Link from '#site/components/Link';
import { useRouter } from '#site/navigation.mjs';
import provideReleaseData from '#site/next-data/providers/releaseData';
import { getDownloadArchiveNavigation } from '#site/util/download/archive';

type WithReleaseSelectProps = Omit<
  ComponentProps<typeof WithNoScriptSelect>,
  'values' | 'as' | 'onChange'
>;

const WithReleaseSelect: FC<WithReleaseSelectProps> = ({ ...props }) => {
  const releaseData = provideReleaseData();
  const { push } = useRouter();
  const navigation = getDownloadArchiveNavigation(releaseData);

  return (
    <WithNoScriptSelect
      {...props}
      values={navigation}
      as={Link}
      onChange={push}
    />
  );
};

export default WithReleaseSelect;
