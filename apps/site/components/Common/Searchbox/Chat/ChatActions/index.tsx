'use client';

import {
  DocumentCheckIcon,
  ClipboardIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/solid';
import type { Interaction } from '@orama/core';
import { ChatInteractions } from '@orama/ui/components';
import type { FC } from 'react';

import styles from './index.module.css';

type ChatActionsProps = {
  interaction: Interaction;
  index: number;
  totalInteractions: number;
};

export const ChatActions: FC<ChatActionsProps> = ({
  interaction,
  index,
  totalInteractions,
}) => {
  if (!interaction.response) return null;

  return (
    <div className={styles.chatActionsContainer}>
      <ul className={styles.chatActionsList}>
        {index === totalInteractions - 1 && (
          <li>
            <ChatInteractions.RegenerateLatest
              className={styles.chatAction}
              interaction={interaction}
            >
              <ArrowPathIcon />
            </ChatInteractions.RegenerateLatest>
          </li>
        )}
        <li>
          <ChatInteractions.CopyMessage
            className={styles.chatAction}
            interaction={interaction}
          >
            {(copied: boolean) =>
              copied ? (
                <DocumentCheckIcon className={styles.chatActionIconSelected} />
              ) : (
                <ClipboardIcon />
              )
            }
          </ChatInteractions.CopyMessage>
        </li>
      </ul>
    </div>
  );
};
