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

  const ButtonIcon = copied ? DocumentDuplicateIcon : CodeBracketIcon;

  return (
    <BaseCodeBox
      as={Link}
      onCopy={copyToClipboard}
      buttonContent={
        <>
          <ButtonIcon className="size-4" />
          {t(
            copied
              ? 'components.common.codebox.copied'
              : 'components.common.codebox.copy'
          )}
        </>
      }
      {...props}
    />
  );
};

export default CodeBox;
