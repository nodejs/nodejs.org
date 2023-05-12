import { FormattedMessage } from 'react-intl';
import Link from 'next/link';
import styles from './index.module.scss';
import type { FC } from 'react';

// @TODO: Update this type with generated json from the API
type TableOfContentsItem = {
  title: string;
  url: string;
  items?: TableOfContentsItem[];
};

const traverseTableOfContents = (
  items: TableOfContentsItem[],
  depth: number
) => {
  const filterItems = (subItems: TableOfContentsItem[]) =>
    subItems.filter(item => item && item.title && item.url);

  const currentItems = filterItems(items);

  if (currentItems) {
    return (
      <ul>
        {currentItems.map(item => (
          <li key={item.url}>
            {item.url && item.title && (
              <Link href={item.url}>{item.title}</Link>
            )}
            {item.items && depth < 2 && filterItems(item.items).length > 0
              ? traverseTableOfContents(item.items, depth + 1)
              : null}
          </li>
        ))}
      </ul>
    );
  }

  return null;
};

type Props = {
  tableOfContents: TableOfContentsItem[];
};

const TableOfContents: FC<Props> = ({ tableOfContents }) => {
  if (tableOfContents.length) {
    return (
      <details className={styles.tableOfContents}>
        <summary>
          <strong>
            <FormattedMessage id="components.article.tableOfContents" />
          </strong>
        </summary>
        {traverseTableOfContents(tableOfContents, 1)}
      </details>
    );
  }

  return <div />;
};

export default TableOfContents;
