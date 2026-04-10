import type { Meta as MetaObj, StoryObj } from '@storybook/react-webpack5';

const tableData = [
  { id: 'row-1', cells: ['Data 1', 'Data 2', 'Data 3'] },
  { id: 'row-2', cells: ['Data 1', 'Data 2', 'Data 3'] },
  { id: 'row-3', cells: ['Data 1', 'Data 2', 'Data 3'] },
];

export const Table: StoryObj = {
  render: () => (
    <main>
      <table>
        <thead>
          <tr>
            {['Column 1', 'Column 2', 'Column 3'].map(col => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map(row => (
            <tr key={row.id}>
              {row.cells.map(cell => (
                <td key={`${row.id}-${cell}`}>{cell}</td>
              ))}
            </tr>
          ))}
          <tr>
            <td colSpan={3}>
              <table>
                <thead>
                  <tr>
                    <th>Sub 1</th>
                    <th>Sub 2</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Sub A</td>
                    <td>Sub B</td>
                  </tr>
                  <tr>
                    <td>Sub C</td>
                    <td>Sub D</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  ),
};

export default { title: 'Design System' } as MetaObj;
