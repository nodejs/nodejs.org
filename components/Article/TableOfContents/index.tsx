import { FormattedMessage } from 'react-intl';
import Link from 'next/link';
import styles from './index.module.scss';
import type { FC } from 'react';

type TableOfContentsNode = {
  depth: number;
  value: string;
  id: string;
  children?: TableOfContentsNode[];
  parent?: TableOfContentsNode | null;
};

type TableOfContentsProps = {
  tableOfContents: TableOfContentsNode[];
};

function parseTableOfContents(
  tableOfContents: TableOfContentsNode[]
): TableOfContentsNode[] {
  const parsedTableOfContents: TableOfContentsNode[] = [];

  function addChildNode(
    parent: TableOfContentsNode,
    node: TableOfContentsNode
  ) {
    if (!parent.children) {
      parent.children = [];
    }
    parent.children.push(node);
  }

  tableOfContents.forEach(node => {
    const { depth, value, id } = node;
    const parsedNode: TableOfContentsNode = { depth, value, id };

    let parentNode = parsedTableOfContents[parsedTableOfContents.length - 1];
    while (parentNode && parentNode.depth >= depth) {
      parentNode = parentNode.parent!;
    }

    if (parentNode) {
      addChildNode(parentNode, parsedNode);
    } else {
      parsedTableOfContents.push(parsedNode);
    }

    parsedNode.parent = parentNode || null;
  });

  return parsedTableOfContents;
}

const traverseTableOfContents: FC<TableOfContentsNode[]> = tableOfContents => (
  <ul>
    {parseTableOfContents(tableOfContents).map(item => (
      <li key={item.id}>
        <Link href={`#${item.id}`}>{item.value}</Link>
        {item.children && traverseTableOfContents(item.children)}
      </li>
    ))}
  </ul>
);

const TableOfContents: FC<TableOfContentsProps> = ({ tableOfContents }) => {
  if (tableOfContents.length === 0) {
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
