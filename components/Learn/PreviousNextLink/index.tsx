import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { FormattedMessage } from 'react-intl';
import LocalizedLink from '@/components/LocalizedLink';
import type { LinkInfo } from '@/types';
import type { FC } from 'react';

import styles from './index.module.scss';

type PreviousNextLinkProps = {
  previous?: LinkInfo;
  next?: LinkInfo;
};

const PreviousNextLink: FC<PreviousNextLinkProps> = ({ previous, next }) => {
  if (!previous && !next) {
    return null;
  }

  return (
    <ul className={styles.prevNextLink}>
      <li>
        {previous && (
          <LocalizedLink href={previous.slug} rel="prev">
            <FaAngleDoubleLeft size="1em" style={{ marginRight: '5px' }} />
            <FormattedMessage id="components.learn.previousNextLink.previous" />
          </LocalizedLink>
        )}
      </li>
      <li>
        {next && (
          <LocalizedLink href={next.slug} rel="next">
            <FormattedMessage id="components.learn.previousNextLink.next" />
            <FaAngleDoubleRight style={{ marginLeft: '5px' }} />
          </LocalizedLink>
        )}
      </li>
    </ul>
  );
};

export default PreviousNextLink;
