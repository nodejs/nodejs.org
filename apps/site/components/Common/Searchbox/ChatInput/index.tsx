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
    <div className={styles.textareaContainer}>
      <PromptTextArea.Wrapper className={styles.textareaWrapper}>
        <PromptTextArea.Field
          id="chat-input"
          name="chat-input"
          placeholder={t('components.search.chatPlaceholder')}
          rows={1}
          maxLength={500}
          autoFocus
          className={styles.textareaField}
        />
        <PromptTextArea.Button
          abortContent={<PauseCircleIcon />}
          className={styles.textareaButton}
        >
          <PaperAirplaneIcon />
        </PromptTextArea.Button>
      </PromptTextArea.Wrapper>
      <div className={styles.textareaFooter}>
        <small>{t('components.search.disclaimer')}</small>
      </div>
    </div>
  );
};
