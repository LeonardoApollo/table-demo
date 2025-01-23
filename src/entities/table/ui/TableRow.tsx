import { Input } from '@shared/ui';
import React, { ChangeEvent, memo } from 'react';

import { Row } from '../model/types/tableSchema';

interface TableRowProps extends Row {
  cls: any;
  onChangeCheckbox: (id: string) => () => void;
  onChangeCompany: (id: string) => (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeAddress: (id: string) => (e: ChangeEvent<HTMLInputElement>) => void;
}

export const TableRow: React.FC<TableRowProps> = memo((props) => {
  const {
    id,
    company,
    address,
    selected,
    cls,
    onChangeCheckbox,
    onChangeCompany,
    onChangeAddress,
  } = props;
  return (
    <tr className={selected ? cls.selected : ''}>
      <td>
        <input
          type="checkbox"
          checked={selected}
          onChange={onChangeCheckbox(id)}
        />
      </td>
      <td>
        <Input value={company} onChange={onChangeCompany(id)} />
      </td>
      <td>
        <Input value={address} onChange={onChangeAddress(id)} />
      </td>
    </tr>
  );
});
