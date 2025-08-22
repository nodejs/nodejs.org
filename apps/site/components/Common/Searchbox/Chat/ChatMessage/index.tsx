'use client';

import type { Interaction } from '@orama/core';
import { ChatInteractions } from '@orama/ui/components';
import type { FC } from 'react';

import { ChatActions } from '../ChatActions';
import { ChatSources } from '../ChatSources';
import styles from './index.module.css';

type ChatMessageProps = {
  interaction: Interaction;
  index: number;
  totalInteractions: number;
};

const TypingIndicator: FC = () => (
  <div className={styles.typingIndicator}>
    <span className={styles.typingDot}></span>
    <span className={styles.typingDot}></span>
    <span className={styles.typingDot}></span>
  </div>
);

export const ChatMessage: FC<ChatMessageProps> = ({
  interaction,
  index,
  totalInteractions,
}) => {
  if (!interaction) return null;

  return (
    <>
      <ChatInteractions.UserPrompt
        className={styles.chatUserPrompt}
        style={{
          padding: '24px',
          margin:
            '0 var(--spacing-l, calc(16rem / var(--orama-base-font-size, 16)))',
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '24px',
        }}
      >
        <p>{interaction?.query || ''}</p>
      </ChatInteractions.UserPrompt>

      <ChatInteractions.Loading interaction={interaction}>
        <div className={styles.chatLoadingWrapper}>
          <TypingIndicator />
        </div>
      </ChatInteractions.Loading>

      <ChatSources interaction={interaction} />

      {interaction && (
        <div
          className={styles.chatAssistantMessageWrapper}
          style={{
            backgroundColor: '#0d121c',
            borderRadius:
              'var(--radius-m, calc(12rem / var(--orama-base-font-size, 16)))',
            margin:
              '0 var(--spacing-l, calc(16rem / var(--orama-base-font-size, 16)))',
            padding: '16px',
            marginBottom: '24px',
            width: 'auto',
          }}
        >
          <ChatInteractions.AssistantMessage
            className={styles.chatAssistantMessage}
            markdownClassnames={{
              p: 'my-3 text-white leading-relaxed',
              pre: `rounded-md my-4 text-sm overflow-x-auto whitespace-pre-wrap hljs ${styles.markdownPre}`,
              code: 'px-2 py-1 rounded text-sm whitespace-pre-wrap hljs',
              table: 'w-full border-collapse my-4',
              thead: 'bg-white/10',
              th: 'border border-white/20 px-3 py-2 text-left text-white font-semibold',
              td: 'border border-white/20 px-3 py-2 text-white',
              tr: 'border-b border-white/10',
              h1: 'text-2xl font-bold text-white mb-4 mt-6',
              h2: 'text-xl font-bold text-white mb-3 mt-5',
              h3: 'text-lg font-bold text-white mb-2 mt-4',
              ul: 'list-disc pl-6 my-3 text-white',
              ol: 'list-decimal pl-6 my-3 text-white',
              li: 'mb-1 text-white',
              blockquote:
                'border-l-4 border-white/30 pl-4 my-4 italic text-white/90',
              a: 'text-blue-400 hover:text-blue-300 underline',
            }}
          >
            {interaction.response || ''}
          </ChatInteractions.AssistantMessage>

          <ChatInteractions.Loading interaction={interaction}>
            <ChatActions
              interaction={interaction}
              index={index}
              totalInteractions={totalInteractions}
            />
          </ChatInteractions.Loading>
        </div>
      )}
    </>
  );
};
