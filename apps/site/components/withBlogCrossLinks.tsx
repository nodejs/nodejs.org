import type { FC } from 'react';
import semver from 'semver';

import { getClientContext } from '#site/client-context';
import CrossLink from '#site/components/Common/CrossLink';
import getBlogData from '#site/next-data/blogData';
import type { BlogCategory } from '#site/types';

const extractVersionFromTitle = (title: string): string | null => {
  const match = title.match(/v(\d+\.\d+\.\d+)/);
  return match ? match[1] : null;
};

const WithBlogCrossLinks: FC = () => {
  const { pathname } = getClientContext();

  // Extracts from the static URL the components used for the Blog Post slug
  const [, , category, postname] = pathname.split('/') as [
    unknown,
    unknown,
    BlogCategory,
    string,
  ];

  const { posts } = getBlogData(category);

  // Sort posts by semver for release category
  const sortedPosts =
    category === 'release'
      ? [...posts].sort((a, b) => {
          const versionA = extractVersionFromTitle(a.title);
          const versionB = extractVersionFromTitle(b.title);

          if (versionA && versionB) {
            // Sort by semver in descending order (newest first)
            return semver.rcompare(versionA, versionB);
          }

          // Fallback to date sorting if version extraction fails
          return b.date.getTime() - a.date.getTime();
        })
      : posts;

  const currentItem = sortedPosts.findIndex(
    ({ slug }) => slug === `/blog/${category}/${postname}`
  );

  // For release posts sorted by semver (descending):
  // - Previous should point to an older version (higher index)
  // - Next should point to a newer version (lower index)
  const [previousCrossLink, nextCrossLink] =
    category === 'release'
      ? [sortedPosts[currentItem + 1], sortedPosts[currentItem - 1]]
      : [sortedPosts[currentItem - 1], sortedPosts[currentItem + 1]];

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
