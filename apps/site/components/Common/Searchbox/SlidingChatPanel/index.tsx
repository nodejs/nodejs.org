'use client';

import { XMarkIcon } from '@heroicons/react/24/solid';
import ChatInput from '@node-core/ui-components/Common/Search/Chat/Input';
import { SlidingPanel } from '@orama/ui/components';
import { useTranslations } from 'next-intl';
import type { FC, PropsWithChildren } from 'react';

import styles from './index.module.css';
import { ChatInteractionsContainer } from '../ChatInteractions';

type SlidingChatPanelProps = PropsWithChildren<{
  open: boolean;
  onClose: () => void;
}>;

export const SlidingChatPanel: FC<SlidingChatPanelProps> = ({
  open,
  onClose,
}) => {
  const t = useTranslations();

  return (
    <>
      <SlidingPanel.Wrapper open={open} onClose={onClose}>
        <SlidingPanel.Content
          position="bottom"
          className={styles.slidingPanelContentWrapper}
        >
          <SlidingPanel.Close
            className={styles.slidingPanelCloseButton}
            aria-label={t('components.search.closeChat')}
          >
            <XMarkIcon />
          </SlidingPanel.Close>

          <div className={styles.slidingPanelInner}>
            <ChatInteractionsContainer />
            <div className={styles.slidingPanelBottom}>
              <ChatInput
                suggestions={[
                  t('components.search.suggestionOne'),
                  t('components.search.suggestionTwo'),
                  t('components.search.suggestionThree'),
                ]}
                placeholder={t('components.search.chatPlaceholder')}
                disclaimer={t('components.search.disclaimer')}
              />
            </div>
          </div>
        </SlidingPanel.Content>
      </SlidingPanel.Wrapper>
    </>
  );
};
