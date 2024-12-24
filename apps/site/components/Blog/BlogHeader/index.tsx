import { RssIcon } from '@heroicons/react/24/solid';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import Link from '@/components/Link';
import { siteConfig } from '@/next.json.mjs';

import styles from './index.module.css';

type BlogHeaderProps = { category: string };

const BlogHeader: FC<BlogHeaderProps> = ({ category }) => {
  const t = useTranslations();

  const feed = siteConfig.rssFeeds.find(item => item.category === category);
  const currentFile = feed ? feed.file : 'blog.xml';

  return (
    <header className={styles.blogHeader}>
      <h1>
        {t('layouts.blog.title')}
        <Link
          href={`/feed/${currentFile}`}
          aria-label={t('components.blog.blogHeader.rssLink')}
        >
          <RssIcon />
        </Link>
      </h1>
      <p>{t('components.blog.blogHeader.subtitle')}</p>
    </header>
  );
};

export default BlogHeader;
