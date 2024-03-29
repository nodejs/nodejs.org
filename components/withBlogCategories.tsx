import { useTranslations } from 'next-intl';
import type { ComponentProps, FC } from 'react';

import BlogPostCard from '@/components/Common/BlogPostCard';
import LinkTabs from '@/components/Common/LinkTabs';
import Pagination from '@/components/Common/Pagination';
import type { BlogPostsRSC } from '@/types';
import { mapAuthorToCardAuthors } from '@/util/blogUtils';

type WithBlogCategoriesProps = {
  categories: ComponentProps<typeof LinkTabs>['tabs'];
  blogData: BlogPostsRSC & { category: string; page: number };
};

const mapPaginationPages = (category: string, pages: number) =>
  [...Array(pages).keys()].map(page => ({
    url: `/blog/${category}/page/${page + 1}`,
  }));

const WithBlogCategories: FC<WithBlogCategoriesProps> = ({
  categories,
  blogData,
}) => {
  const t = useTranslations();

  return (
    <>
      <LinkTabs
        label={t('layouts.blog.selectCategory')}
        tabs={categories}
        activeTab={blogData.category}
      >
        <div className="grid grid-cols-[repeat(auto-fill,minmax(theme(spacing.80),1fr))] [grid-gap:theme(spacing.12)_theme(spacing.8)] xs:grid-cols-[1fr]">
          {blogData.posts.map(post => (
            <BlogPostCard
              key={post.slug}
              title={post.title}
              category={post.categories[0]}
              authors={mapAuthorToCardAuthors(post.author)}
              date={post.date}
              slug={post.slug}
            />
          ))}
        </div>
      </LinkTabs>

      <div className="mt-4 border-t border-t-neutral-200 pt-5 dark:border-t-neutral-900 md:mt-8">
        <Pagination
          currentPage={blogData.page}
          pages={mapPaginationPages(
            blogData.category,
            blogData.pagination.pages
          )}
        />
      </div>
    </>
  );
};

export default WithBlogCategories;
