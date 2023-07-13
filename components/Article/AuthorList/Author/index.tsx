import { useState } from 'react';
import { useIntl } from 'react-intl';
import Image from 'next/image';
import styles from './index.module.scss';
import type { FC } from 'react';

type AuthorProps = { username: string; size?: number };

const Author: FC<AuthorProps> = ({ username, size }) => {
  const githubUserName = username.trim();
  const githubLink = `https://github.com/${githubUserName}`;
  const githubImgLink = `https://github.com/${githubUserName}.png?size=${size}`;

  const intl = useIntl();

  const [authorImg, setAuthorImg] = useState(githubImgLink);

  const translation = intl.formatMessage(
    { id: 'components.article.author.githubLinkLabel' },
    { username }
  );

  return (
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
        blurDataURL="/static/images/placeholder-img.png"
        width={size}
        height={size}
        onError={() => setAuthorImg('/static/images/placeholder-img.png')}
      />
    </a>
  );
};

export default Author;
