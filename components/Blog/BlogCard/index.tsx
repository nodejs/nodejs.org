import { FormattedDate, FormattedMessage } from 'react-intl';
import styles from './index.module.scss';
import LocalizedLink from '@/components/LocalizedLink';
import navigation from '@/navigation.json';
import type { BlogPost } from '@/types';
import type { FC } from 'react';

const getBlogCategoryUrl = (category: string): string =>
  `${navigation.blog.link}/${category}/`;

type BlogCardProps = BlogPost & { readingTime: string };

const BlogCard: FC<BlogCardProps> = ({
  title,
  author,
  date,
  category,
  readingTime,
  slug,
}) => (
  <div className={styles.blogCard}>
    <div className={styles.title}>
      <LocalizedLink href={slug}>{title}</LocalizedLink>
      <div className={styles.metadata}>
        {category && (
          <LocalizedLink
            className={styles.category}
            href={getBlogCategoryUrl(category)}
          >
            {category}
          </LocalizedLink>
        )}
        <span>{readingTime}</span>
      </div>
    </div>
    <div className={styles.content}>
      <h4>
        <FormattedDate value={date} day="numeric" month="long" year="numeric" />
      </h4>
      {author && (
        <p>
          <FormattedMessage id="components.blog.blogCard.author.by" />{' '}
          <span>{author}</span>
        </p>
      )}
    </div>
  </div>
);

export default BlogCard;
