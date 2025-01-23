import { StateSchema } from '@app/providers/StoreProvider';

export const getRows = (state: StateSchema) => state.table.rows;
