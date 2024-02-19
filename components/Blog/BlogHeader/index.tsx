'use client';

import { RssIcon } from '@heroicons/react/24/solid';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import Link from '@/components/Link';
import { siteConfig } from '@/next.json.mjs';

import styles from './index.module.css';

type BlogHeaderProps = {
  category: string;
};

const BlogHeader: FC<BlogHeaderProps> = ({ category }) => {
  const t = useTranslations();
  const currentFile =
    siteConfig.rssFeeds.find(item => item.category === category)?.file ??
    'blog.xml';

  return (
    <header className={styles.blogHeader}>
      <h1>
        {t('layouts.blog.title')}
        <Link href={`/feed/${currentFile}`}>
          <RssIcon />
        </Link>
      </h1>
      <p>{t('layouts.blog.subtitle')}</p>
    </header>
  );
};

export default BlogHeader;
