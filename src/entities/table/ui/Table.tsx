import React, { memo, useCallback } from 'react';
import { getRows } from '../model/selectors/getRows';
import { useSelector } from 'react-redux';
import { getColumns } from '../model/selectors/getColumns';
import { useAppDispatch } from '@shared/hooks/useAppDispatch';
import { tableActions } from '../model/slice/tableSlice';
export const Table: React.FC = memo(() => {
    const tableRows = useSelector(getRows);
    const tableColumns = useSelector(getColumns);
    const dispatch = useAppDispatch();
    const handleCheckboxChange = useCallback((id: string) => () => {
        dispatch(tableActions.selectRow(id))
    }, [])

    return (
      <table>
        <thead>
          <tr>
            {tableColumns.map((col,idx) => (<th key={idx}>{col}</th>))}
          </tr>
        </thead>
        <tbody>
          {tableRows.map(row => (
            <tr key={row.id}>
              <td>
                <input type="checkbox" checked={row.selected} onChange={handleCheckboxChange(row.id)} />
              </td>
              <td>{row.company}</td>
              <td>{row.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  });