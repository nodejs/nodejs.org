import type { Interaction, AnyObject } from '@orama/core';
import { ChatInteractions } from '@orama/ui/components';
import type { FC } from 'react';

import styles from './index.module.css';
import type { Document } from '../DocumentLink';
import { DocumentLink } from '../DocumentLink';

type ChatSourcesProps = {
  interaction: Interaction;
};

const ChatSources: FC<ChatSourcesProps> = ({ interaction }) => {
  if (!interaction?.sources) {
    return null;
  }

  return (
    <ChatInteractions.Sources
      interaction={interaction}
      className={styles.chatSources}
      itemClassName={styles.chatSourceItem}
    >
      {(document: AnyObject, index: number) => (
        <div className={styles.chatSource} key={index}>
          {!!document.pageSectionTitle &&
            typeof document.pageSectionTitle === 'string' && (
              <DocumentLink
                document={document as Document}
                className={styles.chatSourceLink}
                data-focus-on-arrow-nav
              >
                <span className={styles.chatSourceTitle}>
                  {document.pageSectionTitle &&
                  document.pageSectionTitle.length > 25
                    ? `${document.pageSectionTitle.substring(0, 25)}...`
                    : document.pageSectionTitle}
                </span>
              </DocumentLink>
            )}
        </div>
      )}
    </ChatInteractions.Sources>
  );
};

export default ChatSources;
