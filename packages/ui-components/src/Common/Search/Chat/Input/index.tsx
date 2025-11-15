import { PaperAirplaneIcon } from '@heroicons/react/20/solid';
import { PauseCircleIcon } from '@heroicons/react/24/solid';
import { PromptTextArea } from '@orama/ui/components';
import { useChat } from '@orama/ui/hooks';
import type { FC, PropsWithChildren } from 'react';
import { useEffect, useRef } from 'react';

import SearchSuggestions from '#ui/Common/Search/Suggestions';

import styles from './index.module.css';

type ChatInputProps = {
  suggestions: Array<string>;
  placeholder: string;
  disclaimer: string;
};

const ChatInput: FC<PropsWithChildren<ChatInputProps>> = ({
  suggestions,
  placeholder,
  disclaimer,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    context: { interactions },
  } = useChat();

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
      {!interactions?.length && <SearchSuggestions suggestions={suggestions} />}
      <div className={styles.textareaContainer}>
        <PromptTextArea.Wrapper className={styles.textareaWrapper}>
          <PromptTextArea.Field
            id="orama-chat-input"
            name="chat-input"
            placeholder={placeholder}
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
          <small>{disclaimer}</small>
        </div>
      </div>
    </>
  );
};

export default ChatInput;
