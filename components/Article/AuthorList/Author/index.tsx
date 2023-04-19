import React, { useState } from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import styles from './index.module.scss';
import Image from 'next/image';

interface Props {
  username: string;
  size?: number;
}

const Author = ({
  username,
  size = 64,
  intl,
}: Props & WrappedComponentProps) => {
  // Clean up username and build links.
  const githubUserName = username.trim();
  const githubLink = `https://github.com/${githubUserName}`;
  const githubImgLink = `https://github.com/${githubUserName}.png?size=${size}`;

  const [authorImg, setAuthorImg] = useState(githubImgLink);

  const translation = intl.formatMessage(
    { id: 'components.article.author.githubLinkLabel' },
    { username }
  );

  return (
    <li>
      <a
        className={styles.link}
        href={githubLink}
        aria-label={translation}
        key={username}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          alt={githubUserName}
          src={authorImg}
          placeholder="blur"
          blurDataURL="/placeholder-img.png"
          width={size}
          height={size}
          onError={() => setAuthorImg('/placeholder-img.png')}
        />
      </a>
    </li>
  );
};

export default injectIntl(Author);
