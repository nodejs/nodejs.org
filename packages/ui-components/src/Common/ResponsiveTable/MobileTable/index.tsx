import type { ResponsiveTableProps, TableData } from '..';
import styles from './index.module.css';
import { Card, CardBody, CardHeader } from '../../Card';

function MobileTable<T extends TableData>({
  data,
  columns,
  getRowId,
  getRowLabel,
}: ResponsiveTableProps<T>) {
  return (
    <div role="table" className="space-y-4">
      {data.map(row => (
        <Card role="rowgroup" key={getRowId(row)}>
          <CardHeader>{getRowLabel(row)}</CardHeader>

          <CardBody role="row">
            {columns.map(column => (
              <div key={column.key} className={styles.row}>
                <div role="columnheader" className={styles.header}>
                  {column.header}
                </div>

                <div role="cell" className={styles.value}>
                  {row[column.key]}
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      ))}
    </div>
  );
}

export default MobileTable;
