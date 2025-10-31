'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { SearchRoot, ChatRoot, Modal } from '@orama/ui/components';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import '@orama/ui/styles.css';

import { OramaProvider, useOrama } from '#site/providers/oramaProvider';
import { SearchboxProvider } from '#site/providers/searchboxProvider';

import styles from './index.module.css';
import { InnerSearchboxModal } from './InnerSearchboxModal';

const Searchbox: FC = () => {
  const orama = useOrama();
  const t = useTranslations();

  return (
    <div className={styles.searchboxContainer}>
      <Modal.Root>
        <Modal.Trigger
          type="button"
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
          closeOnOutsideClick
          closeOnEscape
          className={styles.modalWrapper}
        >
          <SearchRoot client={orama ?? null}>
            <ChatRoot
              client={orama ?? null}
              askOptions={{ throttle_delay: 50 }}
            >
              <Modal.Inner className={styles.modalInner}>
                <Modal.Content className={styles.modalContent}>
                  <InnerSearchboxModal />
                </Modal.Content>
              </Modal.Inner>
            </ChatRoot>
          </SearchRoot>
        </Modal.Wrapper>
      </Modal.Root>
    </div>
  );
};

const OramaSearchWrapper = () => {
  return (
    <OramaProvider>
      <SearchboxProvider>
        <Searchbox />
      </SearchboxProvider>
    </OramaProvider>
  );
};

export default OramaSearchWrapper;
