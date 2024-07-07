import React from 'react';
import { Table } from '@mantine/core';

type TableProps = {
  rows: JSX.Element[] | undefined;
  components: string[];
} & React.TableHTMLAttributes<HTMLTableElement>;

function CustomTable({ components, rows }: TableProps) {
  return (
    <Table highlightOnHover horizontalSpacing='xl'>
      <Table.Thead>
        <Table.Tr>
          {components.map((component) => (
            <Table.Th key={component}>{component}</Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}

export default CustomTable;
