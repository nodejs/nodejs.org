'use client';

import BaseCodeBox from '@node-core/ui-components/Common/BaseCodeBox';
import { useTranslations } from 'next-intl';
import type { FC, PropsWithChildren, ReactNode } from 'react';

import Link from '@/components/Link';
import { useCopyToClipboard, useNotification } from '@/hooks';

type CodeBoxProps = {
  language: string;
  className?: string;
  showCopyButton?: boolean;
};

const CodeBox: FC<PropsWithChildren<CodeBoxProps>> = props => {
  const [, copyToClipboard] = useCopyToClipboard();
  const notify = useNotification();
  const t = useTranslations();

  const onCopy = (text: string, message: ReactNode) => {
    copyToClipboard(text);
    notify({ duration: 300, message });
  };
  return (
    <BaseCodeBox
      as={Link}
      onCopy={onCopy}
      {...props}
      copyText={t('components.common.codebox.copy')}
      copiedText={t('components.common.codebox.copied')}
    />
  );
};

export default CodeBox;
