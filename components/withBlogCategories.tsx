import type { ComponentProps, FC } from 'react';

import BlogPostCard from '@/components/Common/BlogPostCard';
import Pagination from '@/components/Common/Pagination';
import type { BlogPostsRSC } from '@/types';

import LinkTabs from './Common/LinkTabs';

type WithBlogCategoriesProps = {
  categories: ComponentProps<typeof LinkTabs>['tabs'];
  blogData: BlogPostsRSC & { category: string; page: number };
};

const mapCategoryType = (category: string) =>
  ['announcement', 'release', 'vulnerability'].includes(category)
    ? (category as 'announcement' | 'release' | 'vulnerability')
    : 'announcement';

const mapAuthorToCardAuthors = (author: string) => {
  const authors = author.split(', ');

  return authors.map(fullName => ({
    fullName,
    src: 'https://avatars.githubusercontent.com/u/',
  }));
};

const mapPaginationPages = (category: string, pages: number) =>
  [...Array(pages).keys()].map(page => ({
    url: `/blog/${category}/page/${page + 1}`,
  }));

const WithBlogCategories: FC<WithBlogCategoriesProps> = ({
  categories,
  blogData,
}) => (
  <>
    <LinkTabs tabs={categories} activeTab={blogData.category}>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(theme(spacing.80),1fr))] [grid-gap:theme(spacing.8)]">
        {blogData.posts.map(post => (
          <BlogPostCard
            key={post.slug}
            title={post.title}
            type={mapCategoryType(post.categories[0])}
            authors={mapAuthorToCardAuthors(post.author)}
            date={post.date}
          />
        ))}
      </div>
    </LinkTabs>

    <div className="mt-12 border-t border-t-neutral-200 pt-5 dark:border-t-neutral-900">
      <Pagination
        currentPage={blogData.page}
        pages={mapPaginationPages(blogData.category, blogData.pagination.pages)}
      />
    </div>
  </>
);

export default WithBlogCategories;
