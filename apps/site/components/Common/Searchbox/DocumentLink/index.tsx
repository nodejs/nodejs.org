'use client';

import styles from '@node-core/ui-components/Common/Search/Results/Hit/index.module.css';
import Link from 'next/link';
import { useLocale } from 'next-intl';

import type { FC } from 'react';

import { getDocumentHref } from '../SearchItem/utils';

export type Document = {
  path: string;
  siteSection: string;
  pageSectionTitle?: string;
};

type DocumentLinkProps = {
  document: Document;
  className?: string;
  children?: React.ReactNode;
  'data-focus-on-arrow-nav'?: boolean;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const DocumentLink: FC<DocumentLinkProps> = ({
  document,
  className = styles.link,
  children,
  'data-focus-on-arrow-nav': dataFocusOnArrowNav,
  ...props
}) => {
  const locale = useLocale();

  return (
    <Link
      href={getDocumentHref(document, locale)}
      className={className}
      data-focus-on-arrow-nav={dataFocusOnArrowNav}
      {...props}
    >
      {children}
    </Link>
  );
};
