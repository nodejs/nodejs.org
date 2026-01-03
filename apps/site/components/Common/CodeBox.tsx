'use client';

import BaseCodeBox from '@node-core/ui-components/Common/BaseCodeBox';
import { useTranslations } from 'next-intl';

import Link from '#site/components/Link';

import type { FC, PropsWithChildren } from 'react';

type CodeBoxProps = {
  language: string;
  className?: string;
};

const CodeBox: FC<PropsWithChildren<CodeBoxProps>> = props => {
  const t = useTranslations();

  return (
    <BaseCodeBox
      as={Link}
      copyButtonLabel={t('components.common.codebox.copy')}
      copiedButtonLabel={t('components.common.codebox.copied')}
      {...props}
    />
  );
};

export default CodeBox;
