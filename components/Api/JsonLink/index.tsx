import { FormattedMessage } from 'react-intl';
import { FaRobot } from 'react-icons/fa';
import { DOCS_URL } from '@/next.constants.mjs';
import type { FC } from 'react';

import styles from './index.module.scss';

type JsonLinkProps = {
  fileName: string;
  version: string;
};

const JsonLink: FC<JsonLinkProps> = ({ fileName, version }) => (
  <div className={styles.json}>
    <a href={`${DOCS_URL}latest-${version}.x/api/${fileName}.json`}>
      <FormattedMessage id="components.api.jsonLink.title" tagName="span" />
      <FaRobot className={styles.FaRobotIcon} />
    </a>
  </div>
);

export default JsonLink;
