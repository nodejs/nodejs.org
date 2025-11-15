import {
  DocumentCheckIcon,
  ClipboardIcon,
  ArrowPathIcon,
  HandThumbDownIcon,
} from '@heroicons/react/24/solid';
import type { Interaction } from '@orama/core';
import { ChatInteractions } from '@orama/ui/components';
import classNames from 'classnames';
import type { FC } from 'react';
import { useState } from 'react';

import styles from './index.module.css';

type ChatActionsProps = {
  interaction: Interaction;
};

const ChatActions: FC<ChatActionsProps> = ({ interaction }) => {
  const [isDisliked, setIsDisliked] = useState(false);

  const dislikeMessage = () => setIsDisliked(!isDisliked);

  if (!interaction.response) {
    return null;
  }

  return (
    <div className={styles.chatActionsContainer}>
      <ul className={styles.chatActionsList}>
        <li>
          <ChatInteractions.RegenerateLatest
            className={styles.chatAction}
            interaction={interaction}
          >
            <ArrowPathIcon />
          </ChatInteractions.RegenerateLatest>
        </li>
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
        {!interaction.loading && (
          <li>
            <button
              className={classNames(styles.chatAction, {
                [styles.chatActionDisaliked]: isDisliked,
              })}
              onClick={dislikeMessage}
            >
              <HandThumbDownIcon />
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ChatActions;
