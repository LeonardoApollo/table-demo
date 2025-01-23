import { useAppDispatch } from '@shared/hooks/useAppDispatch';
import React, { ChangeEvent, memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getColumns } from '../model/selectors/getColumns';
import { getRows } from '../model/selectors/getRows';
import { tableActions } from '../model/slice/tableSlice';
import cls from './Table.module.scss';
import { TableColumns } from './TableColumns';
import { TableRow } from './TableRow';

const generateRandomRow = (id: number) => ({
  id: String(id),
  company: `Company ${id}`,
  address: `Address ${id}`,
  selected: false,
});

export const Table: React.FC = memo(() => {
  const tableRows = useSelector(getRows);
  const tableColumns = useSelector(getColumns);
  const totalRows = tableRows.length;
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

  const loadMoreRows = (totalRows: number) => {
    const newRows = Array.from({ length: 10 }, (_, index) =>
      generateRandomRow(totalRows + index + Date.now()),
    );
    newRows.forEach((row) => {
      dispatch(tableActions.addRow(row));
    });
  };

  useEffect(() => {
    const target = document.getElementById('load-more-target');
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (totalRows <= 40) {
          loadMoreRows(totalRows);
        } else if (totalRows > 40 && target?.style.display !== 'none') {
          dispatch(
            tableActions.addRow({
              id: `${Date.now()}`,
              company: 'End of Infinite Scroll',
              address: 'You listed to the end',
              selected: false,
            }),
          );
          if (target) target.style.display = 'none';
        }
      }
    });

    if (
      target &&
      totalRows > 17 &&
      totalRows < 40 &&
      target.style.display === 'none'
    ) {
      target.style.display = 'block';
    }

    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [totalRows]);

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
        <tr id="load-more-target">
          <td>
            <div className={cls.observer} />
          </td>
        </tr>
      </tbody>
    </table>
  );
});
