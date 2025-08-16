import type { TableData } from '#ui/types';

import type { ResponsiveTableProps } from '..';

function DesktopTable<T extends TableData>({
  data,
  columns,
  getRowId,
}: ResponsiveTableProps<T>) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column.key}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={getRowId(row, index)}>
            {columns.map(column => (
              <td key={column.key}>{row[column.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DesktopTable;
