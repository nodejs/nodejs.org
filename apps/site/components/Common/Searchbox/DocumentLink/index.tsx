'use client';

import styles from '@node-core/ui-components/Common/Search/Results/Hit/index.module.css';
import Link from 'next/link';
import { useLocale } from 'next-intl';

import type { FC } from 'react';

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

  const href =
    document.siteSection?.toLowerCase() === 'docs'
      ? `/${document.path}`
      : `/${locale}/${document.path}`;

  return (
    <Link
      href={href}
      className={className}
      data-focus-on-arrow-nav={dataFocusOnArrowNav}
      {...props}
    >
      {children}
    </Link>
  );
};
