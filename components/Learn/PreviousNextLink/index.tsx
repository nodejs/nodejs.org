import Link from 'next/link';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { FormattedMessage } from 'react-intl';
import styles from './index.module.scss';
import type { LinkInfo } from '../../../types';

type Props = {
  previous?: LinkInfo;
  next?: LinkInfo;
};

const PrevNextLink = ({ previous, next }: Props) => {
  if (!previous && !next) return null;

  return (
    <ul className={styles.prevNextLink}>
      <li>
        {previous && (
          <Link href={previous.slug} rel="prev">
            <FaAngleDoubleLeft size="1em" style={{ marginRight: '5px' }} />
            <FormattedMessage id="components.prevnextlink.previous" />
          </Link>
        )}
      </li>
      <li>
        {next && (
          <Link href={next.slug} rel="next">
            <FormattedMessage id="components.prevnextlink.next" />
            <FaAngleDoubleRight style={{ marginLeft: '5px' }} />
          </Link>
        )}
      </li>
    </ul>
  );
};

export default PrevNextLink;
