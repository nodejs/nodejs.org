import React from 'react';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.scss';
import { useLocale } from './../../../hooks/useLocale';

interface Props {
  relativePath?: string;
  editPath?: string;
  absolutePath?: string;
}

// TODO(HinataKah0): Change this
const baseURL =
  'https://github.com/nodejs/nodejs.org/edit/major/website-redesign';

const EditLink = ({ relativePath, editPath, absolutePath }: Props) => {
  const { currentLocale } = useLocale();

  if (!relativePath && !editPath && !absolutePath) return null;

  const href =
    absolutePath ||
    (relativePath
      ? `${baseURL}/pages/${currentLocale.code}/${relativePath}`
      : `${baseURL}/${editPath}`);

  return (
    <div className={styles.edit}>
      <a href={href}>
        <FormattedMessage
          id="components.article.editLink.title"
          tagName="span"
        />
        <FontAwesomeIcon icon={faPencil} />
      </a>
    </div>
  );
};

export default EditLink;
