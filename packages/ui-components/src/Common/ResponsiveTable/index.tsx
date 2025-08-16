import type { TableColumn, TableData } from '#ui/types';

import DesktopTable from './DesktopTable';
import MobileTable from './MobileTable';

export interface ResponsiveTableProps<T extends TableData> {
  data: Array<T>;
  columns: Array<TableColumn>;
  getRowId: (row: T, index: number) => string;
  getRowLabel?: (row: T) => string;
}

function ResponsiveTable<T extends TableData>(props: ResponsiveTableProps<T>) {
  return (
    <div className="w-full">
      <div className="hidden overflow-x-auto lg:block">
        <DesktopTable {...props} />
      </div>

      <div className="lg:hidden">
        <MobileTable {...props} />
      </div>
    </div>
  );
}

export default ResponsiveTable;
