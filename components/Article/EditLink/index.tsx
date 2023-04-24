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

const translationKeyPrefix = 'components.article.editLink.title';

type EditLinkParams = {
  translationKey: string;
  href: string;
};

const getEditLinkParams = (
  { absolutePath, relativePath, editPath }: EditLinkProps,
  lang: string
): EditLinkParams => {
  if (lang === 'en') {
    // Initial content development is done on GitHub in English
    return {
      translationKey: `${translationKeyPrefix}.edit`,
      href:
        absolutePath ||
        (relativePath
          ? `${baseEditURL}/pages/en/${relativePath}`
          : `${baseEditURL}/${editPath}`),
    };
  }

  return {
    translationKey: `${translationKeyPrefix}.translate`,
    href: translationReadmeURL,
  };
};

const EditLink: FC<EditLinkProps> = ({
  absolutePath,
  relativePath,
  editPath,
}) => {
  const { currentLocale } = useLocale();

  if (!relativePath && !editPath && !absolutePath) {
    return null;
  }

  const editLinkParams = getEditLinkParams(
    { absolutePath, relativePath, editPath },
    currentLocale.code
  );

  return (
    <div className={styles.edit}>
      <a href={editLinkParams.href}>
        <FormattedMessage id={editLinkParams.translationKey} tagName="span" />
        <FaPencilAlt />
      </a>
    </div>
  );
};

export default EditLink;
