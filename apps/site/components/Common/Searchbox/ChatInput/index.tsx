'use client';

import { PaperAirplaneIcon } from '@heroicons/react/20/solid';
import { PauseCircleIcon } from '@heroicons/react/24/solid';
import { PromptTextArea, Suggestions } from '@orama/ui/components';
import { useChat } from '@orama/ui/hooks';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';
import { useEffect, useRef } from 'react';

import styles from './index.module.css';

export const ChatInput: FC = () => {
  const t = useTranslations();
  const {
    context: { interactions },
  } = useChat();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const suggestions = [
    t('components.search.suggestionOne'),
    t('components.search.suggestionTwo'),
    t('components.search.suggestionThree'),
  ];

  const hasInteractions = !!interactions?.length;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

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
            id="orama-chat-input"
            name="chat-input"
            placeholder={t('components.search.chatPlaceholder')}
            rows={1}
            maxLength={500}
            autoFocus
            ref={textareaRef}
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
