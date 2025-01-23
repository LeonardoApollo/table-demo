import { StateSchema } from '@app/providers/StoreProvider';

export const getColumns = (state: StateSchema) => state.table.columns;
