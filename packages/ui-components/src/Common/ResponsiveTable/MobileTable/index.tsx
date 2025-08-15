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
    <div className="space-y-4">
      {data.map(row => (
        <Card key={getRowId(row)}>
          <CardHeader>{getRowLabel(row)}</CardHeader>

          <CardBody>
            {columns.map(column => (
              <div key={column.key} className={styles.row}>
                <div className={styles.header}>{column.header}</div>

                <div className={styles.value}>{row[column.key]}</div>
              </div>
            ))}
          </CardBody>
        </Card>
      ))}
    </div>
  );
}

export default MobileTable;
