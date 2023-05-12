import { FormattedMessage } from 'react-intl';
import Link from 'next/link';
import styles from './index.module.scss';
import type { FC } from 'react';

type PropsTableOfContents = {
  depth: number;
  value: string;
  id: string;
}[];

const traverseTableOfContents = (tableOfContents: PropsTableOfContents) => {
  return (
    <ul>
      {tableOfContents.map(item => {
        return (
          <li key={item.id}>
            <Link href={`#${item.id}`}>{item.value}</Link>
          </li>
        );
      })}
    </ul>
  );
};
const TableOfContents: FC<{ tableOfContents: PropsTableOfContents }> = ({
  tableOfContents,
}) => {
  if (!tableOfContents.length) {
    return null;
  }
  return (
    <details className={styles.tableOfContents}>
      <summary>
        <strong>
          <FormattedMessage id="components.article.tableOfContents" />
        </strong>
      </summary>
      {traverseTableOfContents(tableOfContents)}
    </details>
  );
};

export default TableOfContents;
