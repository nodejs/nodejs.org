import {
  Children,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react';

import type { TableColumn, TableData } from '#ui/types';

const hasChildren = (props: unknown): props is { children: ReactNode } =>
  typeof props === 'object' && props !== null && 'children' in props;

const isTableElement = (
  child: ReactNode,
  tagName: string
): child is ReactElement<{ children?: ReactNode }> =>
  isValidElement(child) && child.type === tagName;

const getTextContent = (node: ReactNode): string => {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(getTextContent).join('');
  if (isValidElement(node) && hasChildren(node.props))
    return getTextContent(node.props.children);
  return '';
};

const getColumnKey = (headerText: string, index: number): string =>
  headerText
    ? headerText.toLowerCase().trim().replace(/\s+/g, '_')
    : `col_${index}`;

export const extractColumns = (thead: ReactElement): Array<TableColumn> => {
  if (!hasChildren(thead.props) || !thead.props.children) return [];

  const headerRows = Children.toArray(thead.props.children);
  const firstRow = headerRows[0];
  if (!isValidElement(firstRow) || !hasChildren(firstRow.props)) return [];

  const headerCells = Children.toArray(firstRow.props.children);

  return headerCells
    .map((cell, index) => {
      if (!isValidElement(cell) || !hasChildren(cell.props)) return null;

      const headerText = getTextContent(cell.props.children);
      const key = getColumnKey(headerText, index);

      return {
        key: key,
        header: headerText,
      };
    })
    .filter((col): col is TableColumn => col !== null);
};

export const extractData = (
  tbody: ReactElement,
  columns: Array<TableColumn>
): Array<TableData> => {
  if (!hasChildren(tbody.props) || !tbody.props.children) return [];

  const bodyRows = Children.toArray(tbody.props.children);

  return bodyRows
    .map(row => {
      if (!isValidElement(row) || !hasChildren(row.props)) return null;

      const cells = Children.toArray(row.props.children);
      const rowData: TableData = {};

      cells.forEach((cell, i) => {
        if (isValidElement(cell) && hasChildren(cell.props) && columns[i]) {
          rowData[columns[i].key] = cell.props.children;
        }
      });

      return rowData;
    })
    .filter((row): row is TableData => row !== null);
};

export const parseTableStructure = (
  children: ReactNode
): { columns: Array<TableColumn>; data: Array<TableData> } => {
  if (!children) return { columns: [], data: [] };

  const nodes = Children.toArray(children);
  const thead = nodes.find(node => isTableElement(node, 'thead'));
  const tbody = nodes.find(node => isTableElement(node, 'tbody'));

  if (!thead) throw new Error('Thead element not found');
  if (!tbody) throw new Error('Tbody element not found');

  const columns = extractColumns(thead);
  const data = extractData(tbody, columns);

  return { columns, data };
};
