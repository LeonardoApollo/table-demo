import { PayloadAction } from '@reduxjs/toolkit';
import { buildSlice } from '@shared/libs/store';
import { Row, TableSchema } from '../types/tableSchema';
const initialState: TableSchema = {
    columns: ['', 'Название компании', 'Адрес'],
    rows: [],
    selected: [],
};

export const tableSlice = buildSlice({
    name: 'table',
    initialState,
    reducers: {
        add: (state, { payload }: PayloadAction<Row>) => {
            console.log(payload);
        },
        delete: (state, { payload }: PayloadAction<string[]>) => {
            console.log(payload);
        },
        select: (state, { payload }: PayloadAction<string>) => {
            console.log(payload);
        },
        unselect: (state, { payload }: PayloadAction<string>) => {
            console.log(payload);
        },
        selectAll: (state) => {
            console.log(state)
        },
        change: (state, { payload }: PayloadAction<string>) => {
            console.log(payload);
        },
        
    },
});

export const {
    actions: tableActions,
    reducer: tableReducer,
    useActions: useTableActions,
} = tableSlice;