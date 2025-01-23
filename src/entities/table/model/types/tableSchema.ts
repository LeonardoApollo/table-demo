interface Row {
    id: string,
    selected: boolean,
    company: string,
    adress: string
}

interface TableSchema {
    columns: string[];
    rows: Row[];
    selected: string[];
}

export type {TableSchema, Row}