import { tableReducer } from './model/slice/tableSlice';
import { Row, TableSchema } from './model/types/tableSchema';
import { Table } from './ui/Table';

export { tableReducer, Table };
export type { TableSchema, Row };
