import { RssIcon } from '@heroicons/react/24/solid';
import { getTranslations } from 'next-intl/server';
import type { FC } from 'react';

import { getClientContext } from '@/client-context';
import Link from '@/components/Link';
import WithBlogCategories from '@/components/withBlogCategories';
import WithFooter from '@/components/withFooter';
import WithNavBar from '@/components/withNavBar';
import getBlogData from '@/next-data/blogData';
import { siteConfig } from '@/next.json.mjs';

import styles from './layouts.module.css';

const getBlogCategory = async (pathname: string) => {
  // pathname format can either be: /en/blog/{category}
  // or /en/blog/{category}/page/{page}
  // hence we attempt to interpolate the full /en/blog/{category}/page/{page}
  // and in case of course no page argument is provided we define it to 1
  // note that malformed routes can't happen as they are all statically generated
  const [, , category = 'all', , page = 1] = pathname.split('/');

  const { posts, pagination } = await getBlogData(category, Number(page));

  return { category, posts, pagination, page: Number(page) };
};

const BlogLayout: FC = async () => {
  const { pathname } = getClientContext();
  const t = await getTranslations();

  const mapCategoriesToTabs = (categories: Array<string>) =>
    categories.map(category => ({
      key: category,
      label: t(`layouts.blog.categories.${category}`),
      link: `/blog/${category}`,
    }));

  const blogData = await getBlogCategory(pathname);

  return (
    <>
      <WithNavBar />

      <div className={styles.blogLayout}>
        <main>
          <header>
            <h1>
              {t('layouts.blog.title')}
              <Link
                href={`/feed/${siteConfig.rssFeeds.find(item => item.category === blogData.category)?.file ?? 'blog.xml'}`}
              >
                <RssIcon />
              </Link>
            </h1>
            <p>{t('layouts.blog.subtitle')}</p>
          </header>

          <WithBlogCategories
            blogData={blogData}
            categories={mapCategoriesToTabs([
              'all',
              'announcements',
              'release',
              'vulnerability',
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
