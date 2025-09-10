'use client';

import type { Interaction, AnyObject } from '@orama/core';
import { ChatInteractions } from '@orama/ui/components';
import type { FC } from 'react';

import styles from './index.module.css';
import { DocumentLink } from '../DocumentLink';

type DocumentSource = {
  path: string;
  siteSection: string;
  pageSectionTitle?: string;
  [key: string]: unknown;
};

type ChatSourcesProps = {
  interaction: Interaction;
};

export const ChatSources: FC<ChatSourcesProps> = ({ interaction }) => {
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
          <DocumentLink
            document={document as DocumentSource}
            className={styles.chatSourceLink}
            data-focus-on-arrow-nav
          >
            <span className={styles.chatSourceTitle}>
              {document.pageSectionTitle as string}
            </span>
          </DocumentLink>
        </div>
      )}
    </ChatInteractions.Sources>
  );
};
