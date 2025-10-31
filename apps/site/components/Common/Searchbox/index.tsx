'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { SearchRoot, ChatRoot, Modal } from '@orama/ui/components';
import { useTranslations } from 'next-intl';
import type { FC, PropsWithChildren } from 'react';

import '@orama/ui/styles.css';

import { OramaProvider, useOrama } from '#site/providers/oramaProvider';
import {
  SearchboxProvider,
  useSearchbox,
} from '#site/providers/searchboxProvider';

import styles from './index.module.css';
import { InnerSearchboxModal } from './InnerSearchboxModal';

const Searchbox: FC = () => {
  const searchbox = useSearchbox();
  const orama = useOrama();
  const t = useTranslations();

  return (
    <div className={styles.searchboxContainer}>
      <Modal.Root>
        <Modal.Trigger
          type="button"
          data-testid="orama-button"
          onClick={searchbox.toggleModal}
          disabled={!orama}
          enableCmdK
          className={styles.searchButton}
        >
          <div className={styles.searchButtonContent}>
            <MagnifyingGlassIcon />
            {t('components.search.searchPlaceholder')}
          </div>
          <span className={styles.searchButtonShortcut}>⌘ K</span>
        </Modal.Trigger>

        <Modal.Wrapper
          open={searchbox.isOpen}
          onModalClosed={searchbox.closeModal}
          closeOnOutsideClick
          closeOnEscape
          className={styles.modalWrapper}
        >
          <Modal.Inner className={styles.modalInner}>
            <Modal.Content className={styles.modalContent}>
              <InnerSearchboxModal onClose={searchbox.closeModal} />
            </Modal.Content>
          </Modal.Inner>
        </Modal.Wrapper>
      </Modal.Root>
    </div>
  );
};

const OramaSearch: FC<PropsWithChildren> = () => {
  const orama = useOrama();

  return (
    <SearchRoot client={orama ?? null}>
      <ChatRoot client={orama ?? null} askOptions={{ throttle_delay: 50 }}>
        <SearchboxProvider>
          <Searchbox />
        </SearchboxProvider>
      </ChatRoot>
    </SearchRoot>
  );
};

const OramaSearchWrapper = () => {
  return (
    <OramaProvider>
      <OramaSearch />
    </OramaProvider>
  );
};

export default OramaSearchWrapper;
