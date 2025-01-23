import { useAppDispatch } from '@shared/hooks/useAppDispatch';
import React, { ChangeEvent, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { getColumns } from '../model/selectors/getColumns';
import { getRows } from '../model/selectors/getRows';
import { tableActions } from '../model/slice/tableSlice';
import cls from './Table.module.scss';
import { TableColumns } from './TableColumns';
import { TableRow } from './TableRow';

export const Table: React.FC = memo(() => {
  const tableRows = useSelector(getRows);
  const tableColumns = useSelector(getColumns);
  const dispatch = useAppDispatch();
  const handleCheckboxChange = useCallback(
    (id: string) => () => {
      dispatch(tableActions.selectRow(id));
    },
    [],
  );

  const handleChangeCompany = useCallback(
    (id: string) => (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(tableActions.changeCompany({ id, value: e.target.value }));
    },
    [],
  );

  const handleChangeAddress = useCallback(
    (id: string) => (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(tableActions.changeAddress({ id, value: e.target.value }));
    },
    [],
  );

  return (
    <table>
      <thead>
        <TableColumns columns={tableColumns} />
      </thead>
      <tbody>
        {tableRows.map((row) => (
          <TableRow
            key={row.id}
            id={row.id}
            company={row.company}
            address={row.address}
            selected={row.selected}
            cls={cls}
            onChangeCheckbox={handleCheckboxChange}
            onChangeCompany={handleChangeCompany}
            onChangeAddress={handleChangeAddress}
          />
        ))}
      </tbody>
    </table>
  );
});
