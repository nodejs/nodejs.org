import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { SearchResults } from '@orama/ui/components';

import type { LinkLike } from '#ui/types';
import type { FC } from 'react';

import styles from './index.module.css';

type HitProps = {
  document: {
    title?: string;
    description?: string;
    href: string;
  };
  mode?: 'search' | 'chat';
  as?: LinkLike;
};

const Hit: FC<HitProps> = ({ document, mode = 'search', as: Link = 'a' }) => (
  <SearchResults.Item>
    <Link
      href={document.href}
      tabIndex={mode === 'search' ? 0 : -1}
      aria-hidden={mode === 'chat'}
      data-focus-on-arrow-nav
      className={styles.link}
    >
      <DocumentTextIcon />
      <div>
        {typeof document?.title === 'string' && <h3>{document.title}</h3>}
        {typeof document?.description === 'string' && (
          <p className={styles.hitDescription}>{document.description}</p>
        )}
      </div>
    </Link>
  </SearchResults.Item>
);

export default Hit;
