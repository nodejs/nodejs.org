'use client';

import {
  DocumentDuplicateIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline';
import type { CopyButtonProps } from '@node-core/ui-components/Common/CodeBox';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import WithButton from '@/components/withButton';
import { useCopyToClipboard, useNotification } from '@/hooks';

const CopyButton: FC<CopyButtonProps> = ({ styles, ref }) => {
  const notify = useNotification();
  const [, copyToClipboard] = useCopyToClipboard();
  const t = useTranslations();

  const onCopy = async () => {
    if (ref.current?.textContent) {
      copyToClipboard(ref.current.textContent);

      notify({
        duration: 3000,
        message: (
          <div className={styles.notification}>
            <CodeBracketIcon className={styles.icon} />
            {t('components.common.codebox.copied')}
          </div>
        ),
      });
    }
  };

  return (
    <WithButton className={styles.action} kind="neutral" onClick={onCopy}>
      <DocumentDuplicateIcon className={styles.icon} />
      {t('components.common.codebox.copy')}
    </WithButton>
  );
};

export default CopyButton;
