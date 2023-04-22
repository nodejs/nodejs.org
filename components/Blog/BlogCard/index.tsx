import { FormattedMessage } from 'react-intl';
import styles from './index.module.scss';
import LocalizedLink from '../../LocalizedLink';
import navigation from '../../../navigation.json';
import type { BlogPost } from '../../../types';
import type { FC } from 'react';

const getBlogCategoryUrl = (category: string): string =>
  `${navigation.blog.link}/${category}/`;

const getBlogPostUrl = (slug: string) =>
  slug.endsWith('/') ? slug : `${slug}/`;

type Props = {} & Omit<BlogPost, 'file'>;

const BlogCard: FC<Props> = ({ title, author, date, category, slug }) => {
  const blogCategoryUrl = getBlogCategoryUrl(category);

  return (
    <div className={styles.blogCard}>
      <div className={styles.title}>
        <LocalizedLink href={getBlogPostUrl(slug)}>{title}</LocalizedLink>
        <div className={styles.metadata}>
          {category && (
            <LocalizedLink className={styles.category} href={blogCategoryUrl}>
              {category}
            </LocalizedLink>
          )}
        </div>
      </div>
      <div className={styles.content}>
        <h4>{date}</h4>
        {author && (
          <p>
            <FormattedMessage id="components.blog.blogCard.author.by" />{' '}
            <span>{author}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
