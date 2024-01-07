'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import type { ComponentProps, FC } from 'react';

import BlogPostCard from '@/components/Common/BlogPostCard';
import Pagination from '@/components/Common/Pagination';
import Tabs from '@/components/Common/Tabs';
import { useRouter } from '@/navigation.mjs';
import type { BlogPostsRSC } from '@/types';

type WithBlogCategoriesProps = {
  categories: ComponentProps<typeof Tabs>['tabs'];
  blogData: BlogPostsRSC & { category: string; page: number };
};

const getCategoryType = (category: string) =>
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
}) => {
  const { push } = useRouter();

  const changeBlogCategory = (category: string) => push(`/blog/${category}`);

  return (
    <>
      <Tabs
        tabs={categories}
        defaultValue={blogData.category}
        onValueChange={changeBlogCategory}
        headerClassName="mb-12 mt-8 border-b border-b-neutral-200 dark:border-b-neutral-800"
      >
        <TabsPrimitive.Content value={blogData.category}>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(theme(spacing.80),1fr))] [grid-gap:theme(spacing.8)]">
            {blogData.posts.map(post => (
              <BlogPostCard
                key={post.slug}
                title={post.title}
                type={getCategoryType(post.categories[0])}
                authors={mapAuthorToCardAuthors(post.author)}
                date={post.date}
              />
            ))}
          </div>
        </TabsPrimitive.Content>
      </Tabs>

      <div className="mt-12 border-t border-t-neutral-200 pt-5 dark:border-t-neutral-900">
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
