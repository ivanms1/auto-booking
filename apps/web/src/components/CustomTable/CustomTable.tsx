import React from 'react';
import { Table } from '@mantine/core';

type TableProps = {
  rows: { id: string; values: (string|number)[] }[];
  columns: string[];
} & React.TableHTMLAttributes<HTMLTableElement>;

function CustomTable({ columns, rows }: TableProps) {
  return (
    <Table highlightOnHover horizontalSpacing='xl'>
      <Table.Thead>
        <Table.Tr>
          {columns.map((column) => (
            <Table.Th key={column}>{column}</Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {rows.map((row) => (
          <Table.Tr key={row.id}>
            {row.values.map((value) => (
              <Table.Td key={value}>{value}</Table.Td>
            ))}
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}

export default CustomTable;
