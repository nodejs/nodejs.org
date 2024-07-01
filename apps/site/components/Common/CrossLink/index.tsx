import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import PrevNextArrow from '@/components/Common/PrevNextArrow';
import Link from '@/components/Link';
import type { FormattedMessage } from '@/types';

import styles from './index.module.css';

type CrossLinkProps = {
  type: 'previous' | 'next';
  text: FormattedMessage;
  link: string;
};

const CrossLink: FC<CrossLinkProps> = ({ type, text, link }) => {
  const t = useTranslations();

  return (
    <Link className={styles.crossLink} href={link}>
      <span
        className={classNames(styles.header, {
          [styles.reverse]: type === 'next',
        })}
      >
        <PrevNextArrow className={styles.icon} type={type} />
        {t(`components.common.crossLink.${type}`)}
      </span>

      <span
        className={classNames(styles.content, {
          [styles.reverse]: type === 'next',
        })}
      >
        {text}
      </span>
    </Link>
  );
};

export default CrossLink;
