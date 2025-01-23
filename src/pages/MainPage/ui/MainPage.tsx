import { Row, Table } from '@entities/Table';
import { getSelectedRows } from '@entities/Table/model/selectors/getSelectedRows';
import { tableActions } from '@entities/Table/model/slice/tableSlice';
import { useAppDispatch } from '@shared/hooks/useAppDispatch';
import { Button } from '@shared/ui';
import { AddCompanyButton } from '@widgets/addCompanyButton';
import React, { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import cls from './MainPage.module.scss';

export const MainPage: React.FC = memo(() => {
  const dispatch = useAppDispatch();
  const selectedRows = useSelector(getSelectedRows);

  const handleDeleteCompany = () =>
    dispatch(tableActions.deleteRows(selectedRows));

  const handleAddCompany = useCallback((company: Row) => {
    dispatch(tableActions.addRow(company));
  }, []);

  const handleSelectAll = useCallback(() => {
    dispatch(tableActions.selectAllRows());
  }, []);
  return (
    <>
      <div className={cls.header}>
        <div className={cls.title}>Таблица Компаний</div>
        <div className={cls.buttons}>
          <Button onClick={handleSelectAll}>Выбрать все</Button>
          <AddCompanyButton onAddCompany={handleAddCompany} />
          <Button disabled={!selectedRows.length} onClick={handleDeleteCompany}>
            Удалить выбранное
          </Button>
        </div>
      </div>
      <Table />
    </>
  );
});
