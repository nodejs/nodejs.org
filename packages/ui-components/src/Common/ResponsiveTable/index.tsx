import DesktopTable from './DesktopTable';
import MobileTable from './MobileTable';

type Column = {
  key: string;
  header: string;
};

export type TableData = Record<string, React.ReactNode>;

export interface ResponsiveTableProps<T extends TableData> {
  data: Array<T>;
  columns: Array<Column>;
  getRowId: (row: T) => string;
  getRowLabel: (row: T) => string;
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
