import React, { memo } from 'react';

interface TableColumnsProps {
  columns: string[];
}

export const TableColumns: React.FC<TableColumnsProps> = memo(({ columns }) => {
  return (
    <tr>
      {columns.map((col, idx) => (
        <th key={idx}>{col}</th>
      ))}
    </tr>
  );
});
