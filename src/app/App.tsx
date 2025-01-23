import { Row } from '@entities/Table';
import { getSelectedRows } from '@entities/Table/model/selectors/getSelectedRows';
import { tableActions } from '@entities/Table/model/slice/tableSlice';
import { Table } from '@entities/Table/ui';
import { useAppDispatch } from '@shared/hooks/useAppDispatch';
import { AddCompanyButton } from '@widgets/addCompanyButton';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';

const App = memo(() => {
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
      <div>Таблица Компаний</div>
      <div>
        <button onClick={handleSelectAll}>Выбрать все</button>
        <AddCompanyButton onAddCompany={handleAddCompany} />
        <button disabled={!selectedRows.length} onClick={handleDeleteCompany}>
          Удалить выбранные компании
        </button>
      </div>
      <Table />
    </>
  );
});

export default App;
