import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { SearchRoot, Modal } from '@orama/ui/components';

import SearchInput from '#ui/Common/Search/Input';

import type { OramaCloud } from '@orama/core';
import type { ComponentProps, FC, PropsWithChildren } from 'react';

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
          <Modal.Inner className={styles.modalInner}>
            <Modal.Content className={styles.modalContent}>
              <SearchInput placeholder={placeholder} ariaLabel={placeholder} />
              <Modal.Close className={styles.modalCloseButton} />
              {children}
            </Modal.Content>
          </Modal.Inner>
        </SearchRoot>
      </Modal.Wrapper>
    </Modal.Root>
  </div>
);

export default SearchModal;
