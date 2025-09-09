'use client';

import { CodeBracketIcon } from '@heroicons/react/24/outline';
import BaseCodeBox from '@node-core/ui-components/Common/BaseCodeBox';
import styles from '@node-core/ui-components/Common/BaseCodeBox/index.module.css';
import { useNotification } from '@node-core/ui-components/Providers/NotificationProvider';
import { useTranslations } from 'next-intl';
import type { FC, PropsWithChildren } from 'react';

import Link from '#site/components/Link';
import { useCopyToClipboard } from '#site/hooks';

type CodeBoxProps = {
  language: string;
  className?: string;
  showCopyButton?: boolean;
};

const CodeBox: FC<PropsWithChildren<CodeBoxProps>> = props => {
  const [, copyToClipboard] = useCopyToClipboard();
  const notify = useNotification();
  const t = useTranslations();

  const onCopy = (text: string) => {
    copyToClipboard(text);

    notify({
      duration: 800,
      message: (
        <div className="flex items-center gap-3">
          <CodeBracketIcon className={styles.icon} />
          {t('components.common.codebox.copied')}
        </div>
      ),
    });
  };

  return (
    <BaseCodeBox
      as={Link}
      onCopy={onCopy}
      {...props}
      buttonText={t('components.common.codebox.copy')}
    />
  );
};

export default CodeBox;
