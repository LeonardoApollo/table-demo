import { PayloadAction } from '@reduxjs/toolkit';
import { buildSlice } from '@shared/libs/store';
import { Row, TableSchema } from '../types/tableSchema';
const initialState: TableSchema = {
    columns: ['', 'Название компании', 'Адрес'],
    rows: [],
    selectedRows: []
};

export const tableSlice = buildSlice({
    name: 'table',
    initialState,
    reducers: {
        addRow: (state, { payload }: PayloadAction<Row>) => {
            state.rows = [...state.rows, payload]
        },
        deleteRows: (state, { payload }: PayloadAction<string[]>) => {
            if(payload.length) {
                
                const idsToDelete = new Set(payload);
                state.rows = state.rows.filter(row => !idsToDelete.has(row.id))
                state.selectedRows = []
            }
        },
        selectRow: (state, { payload }: PayloadAction<string>) => {
            const row = state.rows.find(el => el.id === payload);
            if (row) {
                row.selected = !row.selected;
                row.selected ? state.selectedRows = [...state.selectedRows, row.id] : state.selectedRows = state.selectedRows.filter(id => id !== row.id)
            }  
        },
        selectAllRows: (state) => {
            console.log(state)
        },
        changeCompany: (state, { payload }: PayloadAction<string>) => {
            console.log(payload);
        },
        changeAddress: (state, { payload }: PayloadAction<string>) => {
            console.log(payload);
        },
        
    },
});

export const {
    actions: tableActions,
    reducer: tableReducer,
    useActions: useTableActions,
} = tableSlice;