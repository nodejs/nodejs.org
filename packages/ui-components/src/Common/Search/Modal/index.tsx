import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import type { OramaCloud } from '@orama/core';
import { SearchRoot, ChatRoot, Modal } from '@orama/ui/components';
import type { ComponentProps, FC, PropsWithChildren } from 'react';

import SearchInput from '#ui/Common/Search/Input';

import styles from './index.module.css';

type SearchModalProps = {
  client: OramaCloud | null;
  placeholder: string;
} & ComponentProps<typeof SearchInput>;

const SearchModal: FC<PropsWithChildren<SearchModalProps>> = ({
  children,
  client,
  placeholder,
}) => (
  <div className={styles.searchboxContainer}>
    <Modal.Root>
      <Modal.Trigger
        type="button"
        disabled={!client}
        enableCmdK
        className={styles.searchButton}
      >
        <div className={styles.searchButtonContent}>
          <MagnifyingGlassIcon />
          {placeholder}
        </div>
        <span className={styles.searchButtonShortcut}>⌘ K</span>
      </Modal.Trigger>

      <Modal.Wrapper
        closeOnOutsideClick
        closeOnEscape
        className={styles.modalWrapper}
      >
        <SearchRoot client={client}>
          <ChatRoot client={client} askOptions={{ throttle_delay: 50 }}>
            <Modal.Inner className={styles.modalInner}>
              <Modal.Content className={styles.modalContent}>
                <SearchInput
                  placeholder={placeholder}
                  ariaLabel={placeholder}
                />
                {children}
              </Modal.Content>
            </Modal.Inner>
          </ChatRoot>
        </SearchRoot>
      </Modal.Wrapper>
    </Modal.Root>
  </div>
);

export default SearchModal;
