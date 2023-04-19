import React from 'react';
import { FormattedMessage } from 'react-intl';
import Author from './Author';
import styles from './index.module.scss';

interface Props {
  authors: string[];
}

const AuthorList = ({ authors }: Props) => {
  if (authors.length) {
    return (
      <div className={styles.authorList}>
        <FormattedMessage id="components.article.authorList.title" />
        <ul>
          {authors.map(author => (
            <Author username={author} key={author} size={60} />
          ))}
        </ul>
      </div>
    );
  }

  return null;
};

export default AuthorList;
