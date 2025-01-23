interface Row {
    id: string,
    selected: boolean,
    company: string,
    address: string
}

interface TableSchema {
    columns: string[];
    rows: Row[];
    selectedRows: string[];
}

export type {TableSchema, Row}