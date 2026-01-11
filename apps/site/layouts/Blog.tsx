import { useTranslations } from 'next-intl';

import BlogHeader from '#site/components/Blog/BlogHeader';
import WithBlogCategories from '#site/components/withBlogCategories';
import WithFooter from '#site/components/withFooter';
import WithNavBar from '#site/components/withNavBar';
import { getBlogData } from '#site/util/blog';

import type { LayoutComponentProps } from '#site/components/withLayout.js';
import type { BlogCategory } from '#site/types';
import type { FC } from 'react';

import styles from './layouts.module.css';

type Params = { category: string; page: string };

const getBlogCategory = ({ category = 'all', page }: Params) => {
  const { posts, pagination } = getBlogData(
    category as BlogCategory,
    Number(page)
  );

  return {
    category,
    posts,
    pagination,
    page: Number(page),
  };
};

const BlogLayout: FC<LayoutComponentProps> = ({ params }) => {
  const t = useTranslations();

  const mapCategoriesToTabs = (categories: Array<BlogCategory>) =>
    categories.map(category => ({
      key: category,
      label: t(`layouts.blog.categories.${category}`),
      link: `/blog/${category}`,
    }));

  const blogData = getBlogCategory(params as Params);

  return (
    <>
      <WithNavBar />

      <div className={styles.blogLayout}>
        <main id="main" tabIndex={-1}>
          <BlogHeader category={blogData.category} />

          <WithBlogCategories
            blogData={blogData}
            categories={mapCategoriesToTabs([
              'all',
              'announcements',
              'release',
              'vulnerability',
              'migrations',
              'events',
            ])}
          />
        </main>
      </div>

      <WithFooter />
    </>
  );
};

export default BlogLayout;
