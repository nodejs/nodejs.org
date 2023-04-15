import React from 'react';
import { FormattedMessage } from 'react-intl';
import Author from './Author';
import styles from './index.module.scss';

interface Props {
  authors: string[];
}

const AuthorList = ({ authors }: Props): JSX.Element => {
  if (authors.length) {
    return (
      <div className={styles.authorList}>
        <FormattedMessage id="containers.authorList.title" />
        <ul>
          {authors.map(
            (author): JSX.Element => (
              <Author username={author} key={author} size="60" />
            )
          )}
        </ul>
      </div>
    );
  }

  return <div />;
};

export default AuthorList;
