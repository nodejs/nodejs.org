import { FormattedMessage } from 'react-intl';
import styles from './index.module.scss';
import type { FC } from 'react';

type JsonLinkProps = {
  fileName: string;
  version: string;
};

const JsonLink: FC<JsonLinkProps> = ({ fileName, version }) => (
  <div className={styles.json}>
    <a
      href={`https://nodejs.org/docs/latest-${version}.x/api/${fileName}.json`}
    >
      <FormattedMessage id="components.api.jsonLink.title" tagName="span" />
    </a>
  </div>
);

export default JsonLink;
