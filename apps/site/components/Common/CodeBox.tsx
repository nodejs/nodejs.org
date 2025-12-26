'use client';

import BaseCodeBox from '@node-core/ui-components/Common/BaseCodeBox';
import { useTranslations } from 'next-intl';

import Link from '#site/components/Link';
import { useCopyToClipboard } from '#site/hooks';

import type { FC, PropsWithChildren } from 'react';

type CodeBoxProps = {
  language: string;
  className?: string;
  showCopyButton?: boolean;
};

const CodeBox: FC<PropsWithChildren<CodeBoxProps>> = props => {
  const [copied, copyToClipboard] = useCopyToClipboard();
  const t = useTranslations();

  const onCopy = (text: string) => {
    copyToClipboard(text);
  };

  return (
    <BaseCodeBox
      as={Link}
      onCopy={onCopy}
       copied={copied}
      {...props}
       buttonText={
         copied
           ? t('components.common.codebox.copied')
           : t('components.common.codebox.copy')
       }
    />
  );
};

export default CodeBox;
