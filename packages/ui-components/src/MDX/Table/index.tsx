import type { ReactNode } from 'react';

import { parseTableStructure } from '#ui/util/table';

import ResponsiveTable from '../../Common/ResponsiveTable';

const Table = ({ children }: { children: ReactNode }) => {
  const { data, columns } = parseTableStructure(children);

  return (
    <ResponsiveTable
      data={data}
      columns={columns}
      // We have to use index as row id fallback
      getRowId={(row, index) => String(index)}
    />
  );
};

export default Table;
