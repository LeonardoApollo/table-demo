import { Row } from "@entities/table";
import { getSelectedRows } from "@entities/table/model/selectors/getSelectedRows";
import { tableActions } from "@entities/table/model/slice/tableSlice";
import { Table } from "@entities/table/ui";
import { useAppDispatch } from "@shared/hooks/useAppDispatch";
import { AddCompanyButton } from "@widgets/addCompanyButton";
import { memo, useCallback } from "react";
import { useSelector } from "react-redux";

const App = memo(() => {
    const dispatch = useAppDispatch();
    const selectedRows = useSelector(getSelectedRows);
    
    const handleDeleteCompany = useCallback(() => {
        dispatch(tableActions.deleteRows(selectedRows))
    }, [selectedRows])

    const handleAddCompany = useCallback((company: Row) => {
        dispatch(tableActions.addRow(company))
    }, [])

    return (
        <>
            <div>Таблица Компаний</div>
            <div>
                <AddCompanyButton onAddCompany={handleAddCompany}/>
                <button onClick={handleDeleteCompany}>Удалить выбранные компании</button>
            </div>
            <Table/>
        </>
    )
})

export default App