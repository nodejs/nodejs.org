import classNames from 'classnames';
import type { FC } from 'react';

import PrevNextArrow from '#ui/Common/BasePagination/PrevNextArrow';
import type { LinkLike, FormattedMessage } from '#ui/types';

import styles from './index.module.css';

export type CrossLinkProps = {
  type: 'previous' | 'next';
  text: FormattedMessage;
  label: string;
  link: string;
  as: LinkLike;
};

const BaseCrossLink: FC<CrossLinkProps> = ({
  type,
  label,
  text,
  link,
  as: Component = 'a',
}) => {
  return (
    <Component className={styles.crossLink} href={link}>
      <span
        className={classNames(styles.header, {
          [styles.reverse]: type === 'next',
        })}
      >
        <PrevNextArrow className={styles.icon} type={type} />
        {label}
      </span>

      <span
        className={classNames(styles.content, {
          [styles.reverse]: type === 'next',
        })}
      >
        {text}
      </span>
    </Component>
  );
};

export default BaseCrossLink;
