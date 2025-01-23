import { PayloadAction } from '@reduxjs/toolkit';
import { buildSlice } from '@shared/libs/store';

import { Row, TableSchema } from '../types/tableSchema';

const initialState: TableSchema = {
  columns: ['', 'Название компании', 'Адрес'],
  rows: [],
  selectedRows: [],
  allSelected: false,
};

const updateRow = (
  rows: Row[],
  id: string,
  updatedFields: Partial<Row>,
): Row[] => {
  return rows.map((row) => {
    if (row.id === id) {
      return { ...row, ...updatedFields };
    }
    return row;
  });
};

export const tableSlice = buildSlice({
  name: 'table',
  initialState,
  reducers: {
    addRow: (state, { payload }: PayloadAction<Row>) => {
      state.rows = [...state.rows, payload];
    },
    deleteRows: (state, { payload }: PayloadAction<string[]>) => {
      if (payload.length) {
        const idsToDelete = new Set(payload);
        state.rows = state.rows.filter((row) => !idsToDelete.has(row.id));
        state.selectedRows = [];
        state.allSelected = false;
      }
    },
    selectRow: (state, { payload }: PayloadAction<string>) => {
      const row = state.rows.find((el) => el.id === payload);
      if (row) {
        row.selected = !row.selected;
        row.selected
          ? (state.selectedRows = [...state.selectedRows, row.id])
          : (state.selectedRows = state.selectedRows.filter(
              (id) => id !== row.id,
            ));
        state.selectedRows.length === state.rows.length
          ? (state.allSelected = true)
          : (state.allSelected = false);
      }
    },
    selectAllRows: (state) => {
      const allSelected = !state.allSelected;
      state.rows.forEach((row) => {
        row.selected = allSelected;
      });
      state.selectedRows = allSelected ? state.rows.map((row) => row.id) : [];
      state.allSelected = allSelected;
    },
    changeCompany: (
      state,
      { payload }: PayloadAction<{ id: string; value: string }>,
    ) => {
      state.rows = updateRow(state.rows, payload.id, {
        company: payload.value,
      });
    },
    changeAddress: (
      state,
      { payload }: PayloadAction<{ id: string; value: string }>,
    ) => {
      state.rows = updateRow(state.rows, payload.id, {
        address: payload.value,
      });
    },
  },
});

export const {
  actions: tableActions,
  reducer: tableReducer,
  useActions: useTableActions,
} = tableSlice;
