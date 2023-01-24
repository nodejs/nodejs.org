import type { PropsWithChildren } from 'react';

import BaseLayout from './BaseLayout';
import LocalisedLink from '../components/LocalisedLink';
import { useNextraContext } from '../hooks/useNextraContext';
import { getTimeComponent } from '../util/getTimeComponent';

const CategoryIndexLayout = ({ children }: PropsWithChildren) => {
  const { blogData, frontMatter } = useNextraContext();

  return (
    <BaseLayout>
      <div className="container" dir="auto">
        <h2>{frontMatter.title}</h2>

        <ul className="blog-index">
          {blogData.posts.map(post => (
            <li key={post.slug}>
              {getTimeComponent(post.date, '%d %b %y')}
              <LocalisedLink href={post.slug}>{post.title}</LocalisedLink>
            </li>
          ))}
        </ul>

        {children}
      </div>
    </BaseLayout>
  );
};

export default CategoryIndexLayout;
