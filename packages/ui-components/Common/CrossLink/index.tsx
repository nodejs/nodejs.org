import classNames from 'classnames';
import type { FC } from 'react';

import PrevNextArrow from '@node-core/ui-components/Common/PrevNextArrow';
import type {
  LinkLike,
  FormattedMessage,
} from '@node-core/ui-components/types';

import styles from './index.module.css';

export type CrossLinkProps = {
  type: 'previous' | 'next';
  text: FormattedMessage;
  label: string;
  link: string;
  Wrapper: LinkLike;
};

const CrossLink: FC<CrossLinkProps> = ({
  type,
  label,
  text,
  link,
  Wrapper = 'a',
}) => {
  return (
    <Wrapper className={styles.crossLink} href={link}>
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
    </Wrapper>
  );
};

export default CrossLink;
