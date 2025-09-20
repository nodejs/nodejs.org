import type { Root } from 'mdast';
import { toString } from 'mdast-util-to-string';
import { visit } from 'unist-util-visit';

/**
 * Remark plugin that adds data-label attributes to table cells (td)
 * based on their corresponding table headers (th).
 */
export default function remarkTableTitles() {
  return (tree: Root) => {
    visit(tree, 'table', table => {
      // Ensure table has at least a header row and one data row
      if (table.children.length < 2) {
        return;
      }

      const [headerRow, ...dataRows] = table.children;

      if (headerRow.children.length <= 1) {
        table.data ??= {};

        table.data.hProperties = {
          'data-cards': 'false',
        };
      }

      // Extract header labels from the first row
      const headerLabels = headerRow.children.map(headerCell =>
        toString(headerCell.children)
      );

      // Assign data-label to each cell in data rows
      dataRows.forEach(row => {
        row.children.forEach((cell, idx) => {
          cell.data ??= {};

          if (idx > headerLabels.length) {
            return;
          }

          cell.data.hProperties = {
            'data-label': headerLabels[idx],
          };
        });
      });
    });
  };
}
