'use client';

import { PaperAirplaneIcon } from '@heroicons/react/20/solid';
import { PauseCircleIcon } from '@heroicons/react/24/solid';
import { PromptTextArea } from '@orama/ui/components';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import styles from './index.module.css';

export const ChatInput: FC = () => {
  const t = useTranslations();

  return (
    <div className={styles.container}>
      <PromptTextArea.Wrapper className={styles.promptWrapperCustom}>
        <PromptTextArea.Field
          placeholder={t('components.search.chatPlaceholder')}
          rows={1}
          maxLength={500}
          autoFocus
          className={styles.promptFieldCustom}
        />
        <PromptTextArea.Button
          abortContent={<PauseCircleIcon />}
          className={`${styles.promptButtonCustom} orama-custom-button`}
        >
          <PaperAirplaneIcon className="h-4 w-4" />
        </PromptTextArea.Button>
      </PromptTextArea.Wrapper>
      <div className={styles.slidingPanelFooter}>
        <small>{t('components.search.disclaimer')}</small>
      </div>
    </div>
  );
};
