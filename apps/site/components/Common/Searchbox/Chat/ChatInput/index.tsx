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
    <div className="pb-2 pt-6">
      <PromptTextArea.Wrapper
        className={styles.promptWrapperCustom}
        style={{
          position: 'relative',
          margin: '0 32px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          borderRadius: '16px',
          border: '1px solid rgb(64 64 64)',
          backgroundColor: 'rgb(38 38 38)',
          padding: '12px 16px',
          fontSize: '16px',
          color: 'white',
        }}
      >
        <PromptTextArea.Field
          placeholder={t('components.search.chatPlaceholder')}
          rows={1}
          maxLength={500}
          autoFocus
          className={styles.promptFieldCustom}
          style={{
            width: '100%',
            resize: 'none',
            border: 'none',
            background: 'transparent',
            padding: '0',
            color: 'white',
            fontFamily: 'inherit',
            fontSize: '16px',
            fontWeight: '400',
            lineHeight: '1.5',
            margin: '0',
            outline: 'none',
          }}
        />
        <PromptTextArea.Button
          abortContent={<PauseCircleIcon />}
          className={styles.promptButtonCustom}
          style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            borderRadius: '8px',
            backgroundColor: 'rgb(34 197 94)',
            padding: '8px',
            color: 'white',
            transition: 'background-color 0.3s',
            border: 'none',
          }}
        >
          <PaperAirplaneIcon />
        </PromptTextArea.Button>
      </PromptTextArea.Wrapper>
      <div
        className={styles.slidingPanelFooter}
        style={{
          alignItems: 'center',
          color: '#a3a3a3',
          display: 'flex',
          flexDirection: 'row',
          fontSize: '12px',
          justifyContent: 'center',
          paddingTop: '4px',
        }}
      >
        <small>{t('components.search.disclaimer')}</small>
      </div>
    </div>
  );
};
