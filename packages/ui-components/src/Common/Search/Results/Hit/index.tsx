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
  as?: LinkLike;
};

const Hit: FC<HitProps> = ({ document, as: Link = 'a' }) => (
  <SearchResults.Item>
    <Link href={document.href} data-focus-on-arrow-nav className={styles.link}>
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
