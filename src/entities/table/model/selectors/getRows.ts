import { StateSchema } from '@app/providers/StoreProvider';

export const getSelectedRows = (state: StateSchema) => state.table.rows;