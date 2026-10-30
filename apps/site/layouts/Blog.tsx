import { useTranslations } from 'next-intl';

import { getClientContext } from '#site/client-context';
import BlogHeader from '#site/components/Blog/BlogHeader';
import BlogCategories from '#site/components/BlogCategories';
import Footer from '#site/components/Footer';
import NavBar from '#site/components/NavBar';
import { getBlogData } from '#site/util/blog';

import type { BlogCategory } from '#site/types';
import type { FC } from 'react';

import styles from './layouts.module.css';

const getBlogCategory = (pathname: string) => {
  // pathname format can either be: /en/blog/{category}
  // or /en/blog/{category}/page/{page}
  // hence we attempt to interpolate the full /en/blog/{category}/page/{page}
  // and in case of course no page argument is provided we define it to 1
  // note that malformed routes can't happen as they are all statically generated
  const [, , category = 'all', , page = 1] = pathname.split('/') as [
    unknown,
    unknown,
    BlogCategory,
    unknown,
    number,
  ];

  const { posts, pagination } = getBlogData(category, Number(page));

  return {
    category,
    posts,
    pagination,
    page: Number(page),
  };
};

const BlogLayout: FC = () => {
  const t = useTranslations();
  const { pathname } = getClientContext();

  const mapCategoriesToTabs = (categories: Array<BlogCategory>) =>
    categories.map(category => ({
      key: category,
      label: t(`layouts.blog.categories.${category}`),
      link: `/blog/${category}`,
    }));

  const blogData = getBlogCategory(pathname);

  return (
    <>
      <NavBar />

      <div className={styles.blogLayout}>
        <main id="main" tabIndex={-1}>
          <BlogHeader category={blogData.category} />

          <BlogCategories
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

      <Footer />
    </>
  );
};

export default BlogLayout;
