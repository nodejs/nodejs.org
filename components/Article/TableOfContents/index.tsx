import { FormattedMessage } from 'react-intl';
import Link from 'next/link';
import styles from './index.module.scss';
import type { FC } from 'react';

type PropsTableOfContents = {
  depth: number;
  value: string;
  id: string;
}[];

type ParsedTableOfContents = {
  depth: number;
  value: string;
  id: string;
  parent?: ParsedTableOfContents | null;
  children?: ParsedTableOfContents;
}[];

function parseTableOfContents(
  tableOfContents: PropsTableOfContents
): ParsedTableOfContents {
  const parsedTableOfContents: ParsedTableOfContents = [];

  function addChildNode(
    parent: ParsedTableOfContents,
    node: ParsedTableOfContents
  ) {
    if (!parent.children) {
      parent.children = [];
    }
    parent.children.push(node);
  }

  tableOfContents.forEach(node => {
    const { depth, value, id } = node;
    const parsedNode = { depth, value, id };

    let parentNode = parsedTableOfContents[parsedTableOfContents.length - 1];
    while (parentNode && parentNode.depth >= depth) {
      parentNode = parentNode.parent;
    }

    if (parentNode) {
      addChildNode(parentNode, parsedNode);
    } else {
      parsedTableOfContents.push(parsedNode);
    }

    parsedNode.parent = parentNode || null;
  });

  return parsedTableOfContents as ParsedTableOfContents;
}

const traverseTableOfContents = (tableOfContents: PropsTableOfContents) => {
  const MappedTableOfContents = parseTableOfContents(tableOfContents);

  return (
    <ul>
      {MappedTableOfContents.map(item => (
        <li key={item.id}>
          <Link href={`#${item.id}`}>{item.value}</Link>
          {item.children && traverseTableOfContents(item.children)}
        </li>
      ))}
    </ul>
  );
};
const TableOfContents: FC<{ tableOfContents: PropsTableOfContents }> = ({
  tableOfContents,
}) => {
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
