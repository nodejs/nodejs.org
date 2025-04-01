import type { Meta as MetaObj, StoryObj } from '@storybook/react';

const tableData = [
  ['Data 1', 'Data 2', 'Data 3'],
  ['Data 1', 'Data 2', 'Data 3'],
  ['Data 1', 'Data 2', 'Data 3'],
];

export const Table: StoryObj = {
  render: () => (
    <main>
      <table>
        <thead>
          <tr>
            {['Column 1', 'Column 2', 'Column 3'].map((col, idx) => (
              <th key={idx}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  ),
};

export const HeadlessTable: StoryObj = {
  render: () => (
    <main>
      <table>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  ),
};

export default { title: 'Design System' } as MetaObj;
