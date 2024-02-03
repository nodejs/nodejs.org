import { getTranslations } from 'next-intl/server';
import type { FC } from 'react';

import BlogPostCard from '@/components/Common/BlogPostCard';
import getBlogData from '@/next-data/blogData';

import styles from './calendar.module.css';

const UpcomingSummits: FC = async () => {
  const t = await getTranslations();
  const { posts } = await getBlogData('events', 0);

  const currentDate = new Date();
  const filteredPosts = posts.filter(post => post.date >= currentDate);

  const fallbackPosts = Array(2).fill({
    title: t('components.mdx.upcomingEvents.defaultTitle'),
    categories: ['events'],
  });

  const mappedPosts = fallbackPosts.map((post, key) => {
    const actualPost = filteredPosts[key] || post;

    return (
      <BlogPostCard
        key={actualPost.slug || key}
        title={actualPost.title}
        category={actualPost.categories[0]}
        date={actualPost.date}
        slug={actualPost.slug}
      />
    );
  });

  return <div className={styles.summits}>{mappedPosts}</div>;
};

export default UpcomingSummits;
