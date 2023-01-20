import { FormattedMessage } from 'react-intl';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Pagination from '../components/Pagination';
import LocalisedLink from '../components/LocalisedLink';
import { useNextraContext } from '../hooks/useNextraContext';
import { getTimeComponent } from '../util/getTimeComponent';

const BlogIndexLayout = () => {
  const { blogData } = useNextraContext();

  const currentYear = blogData.currentCategory.replace('year-', '');

  return (
    <>
      <Header />
      <main id="main">
        <div className="container" dir="auto">
          <FormattedMessage
            id="layouts.blogIndex.currentYear"
            values={{ year: currentYear }}
            tagName="h2"
          />

          <ul className="blog-index">
            {blogData.posts.map(post => (
              <li key={post.slug}>
                {getTimeComponent(post.date, '%d %b')}
                <LocalisedLink href={post.slug}>{post.title}</LocalisedLink>
              </li>
            ))}
          </ul>

          <Pagination
            prevSlug={blogData.pagination.prev}
            nextSlug={blogData.pagination.next}
          />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BlogIndexLayout;
