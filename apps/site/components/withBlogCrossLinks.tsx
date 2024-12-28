import type { FC } from 'react';

import { getClientContext } from '@/client-context';
import CrossLink from '@/components/Common/CrossLink';
import getBlogData from '@/next-data/blogData';
import type { BlogCategory } from '@/types';

const WithBlogCrossLinks: FC = async () => {
  const { pathname } = getClientContext();

  // Extracts from the static URL the components used for the Blog Post slug
  const [, , category, postname] = pathname.split('/');

  const { posts } = await getBlogData(category as BlogCategory);

  const currentItem = posts.findIndex(
    ({ slug }) => slug === `/blog/${category}/${postname}`
  );

  const [previousCrossLink, nextCrossLink] = [
    posts[currentItem - 1],
    posts[currentItem + 1],
  ];

  return (
    <div className="max-xs:grid-cols-1 mt-4 grid w-full grid-cols-2 gap-4">
      {(previousCrossLink && (
        <CrossLink
          type="previous"
          text={previousCrossLink.title}
          link={previousCrossLink.slug}
        />
      )) || <div />}

      {nextCrossLink && (
        <CrossLink
          type="next"
          text={nextCrossLink.title}
          link={nextCrossLink.slug}
        />
      )}
    </div>
  );
};

export default WithBlogCrossLinks;
