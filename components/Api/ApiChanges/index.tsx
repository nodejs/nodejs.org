import { FormattedMessage } from 'react-intl';
import styles from './index.module.scss';
import { parseApiDocsVersion } from '../../../util/parseApiDocsVersion';
import type { ApiChange, ApiUpdate } from '../../../types';
import type { FC } from 'react';

type ApiChangesProps = {
  update: ApiUpdate;
  changes: ApiChange[];
};

const ApiChanges: FC<ApiChangesProps> = ({ update, changes }) => (
  <details className={styles.changesComponent}>
    <summary>
      <strong>
        <FormattedMessage id="components.api.apiChanges.history" />
      </strong>
    </summary>
    <table>
      <thead>
        <tr>
          <th>
            <FormattedMessage id="components.api.apiChanges.history.version" />
          </th>
          <th>
            <FormattedMessage id="components.api.apiChanges.history.changes" />
          </th>
        </tr>
      </thead>
      <tbody>
        {changes.map(({ version, description }) => (
          <tr key={`${version.toString()}-${description}`}>
            <td>{parseApiDocsVersion(version)}</td>
            <td>{description}</td>
          </tr>
        ))}
        <tr>
          <td>{parseApiDocsVersion(update.version)}</td>
          <td>
            <FormattedMessage
              id="components.api.apiChanges.addedIn"
              values={{ version: parseApiDocsVersion(update.version) }}
            />
          </td>
        </tr>
      </tbody>
    </table>
  </details>
);

export default ApiChanges;
