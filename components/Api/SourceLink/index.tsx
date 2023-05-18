import { FormattedMessage } from 'react-intl';

import styles from './index.module.scss';
import type { FC } from 'react';

type SourceLinkProps = {
  link: string;
  version: string;
};

const SourceLink: FC<SourceLinkProps> = ({ version, link }) => (
  <p className={styles.sourceLinkComponent}>
    <FormattedMessage id="components.api.sourceLink" />{' '}
    <a href={`https://github.com/nodejs/node/blob/${version}/${link}`}>
      {link}
    </a>
  </p>
);

export default SourceLink;
