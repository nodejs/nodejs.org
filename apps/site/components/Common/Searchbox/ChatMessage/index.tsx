'use client';

import type { Interaction } from '@orama/core';
import { ChatInteractions } from '@orama/ui/components';
import type { FC } from 'react';

import styles from './index.module.css';
import { ChatActions } from '../Chat/ChatActions';
import { ChatSources } from '../Chat/ChatSources';

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
  if (!interaction) {
    return null;
  }

  return (
    <>
      <ChatInteractions.UserPrompt className={styles.chatUserPrompt}>
        <p>{interaction?.query || ''}</p>
      </ChatInteractions.UserPrompt>

      <ChatInteractions.Loading interaction={interaction}>
        <div className={styles.chatLoadingWrapper}>
          <TypingIndicator />
        </div>
      </ChatInteractions.Loading>

      <ChatSources interaction={interaction} />

      {interaction && (
        <div className={styles.chatAssistantMessageWrapper}>
          <ChatInteractions.AssistantMessage
            className={styles.chatAssistantMessage}
            markdownClassnames={{
              p: 'mb-4 leading-relaxed last-of-type:mb-0',
              pre: `my-4 text-md overflow-x-auto hljs [&_pre]:text-sm [&_pre]:rounded-md [&_pre]:p-4 [&_pre]:my-3 [&_pre]:whitespace-break-spaces wrap-break-word`,
              code: 'px-2 py-1 rounded text-sm whitespace-pre-wrap hljs',
              table: 'w-full border-collapse my-4',
              thead: 'bg-white/10',
              th: 'border border-white/20 px-3 py-2 text-left font-semibold',
              td: 'border border-white/20 px-3 py-2',
              tr: 'border-b border-white/10',
              h1: 'text-2xl font-bold mb-4 mt-6',
              h2: 'text-xl font-bold mb-3 mt-5',
              h3: 'text-lg font-extrabold mb-6 mt-3',
              ul: 'list-disc pl-8 my-4',
              ol: 'list-decimal pl-4 my-4',
              li: 'mb-1',
              hr: 'border-t border-white/20 my-6',
              blockquote: 'border-l-4 border-white/30 pl-4 my-4 italic',
              a: 'underline',
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
