import { useState } from 'react';
import { useIntl } from 'react-intl';
import Image from 'next/image';
import styles from './index.module.scss';
import type { FC } from 'react';

type AuthorProps = { username: string; size?: number };

const Author: FC<AuthorProps> = props => {
  // Clean up username and build links.
  const githubUserName = props.username.trim();
  const githubLink = `https://github.com/${githubUserName}`;
  const githubImgLink = `https://github.com/${githubUserName}.png?size=${props.size}`;

  const intl = useIntl();

  const [authorImg, setAuthorImg] = useState(githubImgLink);

  const translation = intl.formatMessage(
    { id: 'components.article.author.githubLinkLabel' },
    { username: props.username }
  );

  return (
    <li>
      <a
        className={styles.link}
        href={githubLink}
        aria-label={translation}
        key={props.username}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          alt={githubUserName}
          src={authorImg}
          placeholder="blur"
          blurDataURL="/placeholder-img.png"
          width={props.size}
          height={props.size}
          onError={() => setAuthorImg('/placeholder-img.png')}
        />
      </a>
    </li>
  );
};

export default Author;
