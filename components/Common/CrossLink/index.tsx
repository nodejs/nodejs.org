import classNames from 'classnames';
import type { FC } from 'react';
import { FormattedMessage } from 'react-intl';

import PrevNextArrow from '@/components/Common/PrevNextArrow';
import LocalizedLink from '@/components/LocalizedLink';

import styles from './index.module.css';

type CrossLinkProps = {
  type: 'previous' | 'next';
  text: string;
  url: string;
};

const CrossLink: FC<CrossLinkProps> = ({ type, text, url }) => (
  <LocalizedLink className={styles.crossLink} href={url}>
    <span
      className={classNames(styles.header, {
        [styles.reverse]: type === 'next',
      })}
    >
      <PrevNextArrow className={styles.icon} type={type} />
      <FormattedMessage id={`components.common.crossLink.${type}`} />
    </span>

    <span
      className={classNames(styles.content, {
        [styles.reverse]: type === 'next',
      })}
    >
      {text}
    </span>
  </LocalizedLink>
);

export default CrossLink;
