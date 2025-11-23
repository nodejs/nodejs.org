import { SparklesIcon } from '@heroicons/react/24/outline';
import { SlidingPanel } from '@orama/ui/components/SlidingPanel';
import { useSearch } from '@orama/ui/hooks/useSearch';
import classNames from 'classnames';

import type { ComponentProps, FC } from 'react';

import styles from './index.module.css';

const ChatTrigger: FC<ComponentProps<typeof SlidingPanel.Trigger>> = ({
  children,
  ...props
}) => {
  const {
    context: { searchTerm },
  } = useSearch();

  return (
    <div className={styles.chatButtonWrapper}>
      <SlidingPanel.Trigger
        className={classNames(styles.chatButton, {
          [styles.chatButtonWithSearch]: searchTerm,
        })}
        initialPrompt={searchTerm || undefined}
        data-focus-on-arrow-nav
        {...props}
      >
        <SparklesIcon />
        <span>
          {searchTerm ? `${searchTerm} - ` : ''}
          {children}
        </span>
      </SlidingPanel.Trigger>
    </div>
  );
};

export default ChatTrigger;
