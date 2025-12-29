'use client';

import {
  DocumentDuplicateIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline';
import BaseCodeBox from '@node-core/ui-components/Common/BaseCodeBox';
import { useTranslations } from 'next-intl';

import Link from '#site/components/Link';
import { useCopyToClipboard } from '#site/hooks';

import type { FC, PropsWithChildren } from 'react';

type CodeBoxProps = {
  language: string;
  className?: string;
};

const CodeBox: FC<PropsWithChildren<CodeBoxProps>> = props => {
  const [copied, copyToClipboard] = useCopyToClipboard();
  const t = useTranslations();

  return (
    <BaseCodeBox
      as={Link}
      onCopy={copyToClipboard}
      buttonContent={
        copied ? (
          <>
            <DocumentDuplicateIcon className="size-4" />
            {t('components.common.codebox.copied')}
          </>
        ) : (
          <>
            <CodeBracketIcon className="size-4" />
            {t('components.common.codebox.copy')}
          </>
        )
      }
      {...props}
    />
  );
};

export default CodeBox;
