import { FormattedMessage } from 'react-intl';
import Link from 'next/link';
import styles from './index.module.scss';
import type { FC } from 'react';

type TableOfContentsProps = {
  tableOfContents: {
    depth: number;
    value: string;
    data?: {
      id: string;
    };
  }[];
};

const TableOfContents: FC<TableOfContentsProps> = ({ tableOfContents }) => {
  return (
    <details className={styles.tableOfContents}>
      <summary>
        <strong>
          <FormattedMessage id="components.article.tableOfContents" />
        </strong>
      </summary>
      <ul>
        {tableOfContents.map(({ depth, value, data }) => (
          <li key={value} className={styles[`depth${depth}`]}>
            <Link href={`#${data?.id}`}>
              {value}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
};

export default TableOfContents;
