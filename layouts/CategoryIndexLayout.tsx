import Footer from '../components/Footer';
import Header from '../components/Header';
import LocalisedLink from '../components/LocalisedLink';
import { useNextraContext } from '../hooks/useNextraContext';
import { getTimeComponent } from '../util/getTimeComponent';

const CategoryIndexLayout = () => {
  const { blogData, frontMatter } = useNextraContext();

  return (
    <>
      <Header />
      <main id="main">
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
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CategoryIndexLayout;
