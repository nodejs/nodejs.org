import { FaPencilAlt } from 'react-icons/fa';
import { FormattedMessage } from 'react-intl';
import styles from './index.module.scss';
import { useLocale } from './../../../hooks/useLocale';
import type { FC } from 'react';

type EditLinkProps = {
  absolutePath?: string;
  relativePath?: string;
  editPath?: string;
};

// TODO(HinataKah0): Change branch from major/website-redesign to main

const baseEditURL =
  'https://github.com/nodejs/nodejs.org/edit/major/website-redesign';

const translationReadmeURL =
  'https://github.com/nodejs/nodejs.org/blob/major/website-redesign/TRANSLATION.md';

const EditLink: FC<EditLinkProps> = ({
  absolutePath,
  relativePath,
  editPath,
}) => {
  const { currentLocale } = useLocale();

  if (!relativePath && !editPath && !absolutePath) return null;

  let href;
  let translationKey = 'components.article.editLink.title.';

  // Initial content development is done on GitHub in English
  switch (currentLocale.code) {
    case 'en':
      href =
        absolutePath ||
        (relativePath
          ? `${baseEditURL}/pages/en/${relativePath}`
          : `${baseEditURL}/${editPath}`);
      translationKey += 'edit';
      break;
    default:
      href = translationReadmeURL;
      translationKey += 'translate';
  }

  return (
    <div className={styles.edit}>
      <a href={href}>
        <FormattedMessage id={translationKey} tagName="span" />
        <FaPencilAlt />
      </a>
    </div>
  );
};

export default EditLink;
