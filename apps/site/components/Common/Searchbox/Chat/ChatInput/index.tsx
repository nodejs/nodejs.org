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
        className={`${styles.promptWrapperCustom} mx-8 flex items-center gap-2 rounded-2xl border border-[rgb(64,64,64)] bg-[rgb(38,38,38)] px-4 py-3 text-base text-white`}
      >
        <PromptTextArea.Field
          placeholder={t('components.search.chatPlaceholder')}
          rows={1}
          maxLength={500}
          autoFocus
          className={`${styles.promptFieldCustom} m-0 w-full resize-none border-none bg-transparent p-0 font-normal leading-relaxed text-white outline-none`}
        />
        <PromptTextArea.Button
          abortContent={<PauseCircleIcon />}
          className={`${styles.promptButtonCustom} orama-custom-button`}
        >
          <PaperAirplaneIcon className="h-4 w-4" />
        </PromptTextArea.Button>
      </PromptTextArea.Wrapper>
      <div
        className={`${styles.slidingPanelFooter} flex flex-row items-center justify-center pt-1 text-xs text-neutral-400`}
      >
        <small>{t('components.search.disclaimer')}</small>
      </div>
    </div>
  );
};
