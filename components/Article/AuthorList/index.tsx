import { FormattedMessage } from 'react-intl';
import Author from './Author';
import styles from './index.module.scss';
import type { FC } from 'react';

type AuthorListProps = { authors: string[] };

const AuthorList: FC<AuthorListProps> = ({ authors }) => {
  if (authors.length) {
    return (
      <div className={styles.authorList}>
        <FormattedMessage id="components.article.authorList.title" />
        <ul>
          {authors.map(author => (
            <li key={author}>
              <Author username={author} key={author} size={60} />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
};

export default AuthorList;
