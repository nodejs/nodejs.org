'use client';

import { PaperAirplaneIcon } from '@heroicons/react/20/solid';
import { PauseCircleIcon } from '@heroicons/react/24/solid';
import { PromptTextArea, Suggestions } from '@orama/ui/components';
import { useChat } from '@orama/ui/hooks';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import styles from './index.module.css';

const suggestions = [
  'How to install Node.js?',
  'How to create an HTTP server?',
  'Upgrading Node.js versions',
];

export const ChatInput: FC = () => {
  const t = useTranslations();
  const {
    context: { interactions },
  } = useChat();

  const hasInteractions = !!interactions?.length;

  return (
    <>
      {!hasInteractions && (
        <Suggestions.Wrapper className={styles.suggestionsWrapper}>
          {suggestions.map(suggestion => (
            <Suggestions.Item
              className={styles.suggestionsItem}
              key={suggestion}
            >
              {suggestion}
            </Suggestions.Item>
          ))}
        </Suggestions.Wrapper>
      )}
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
    </>
  );
};
