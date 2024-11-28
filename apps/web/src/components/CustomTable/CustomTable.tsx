import React from 'react';
import { Table } from '@mantine/core';
import styles from './Table.module.css';
import { dateFormatter } from '@/utils/dateFormatter';

type TableProps = {
  rows: { id: string; values: (string | number)[] }[];
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
            {row.values.map((value, index) => {
              if (index === 0) {
                return (
                  <Table.Td key={`${row.id}-${value}`}>
                    <div className={styles.imageName}>
                      <div className={styles.avatarContent}>
                        {typeof row.values[3] === 'string' && row.values[3] ? <img
                            alt='Avatar'
                            className={styles.profilePicture}
                            src={row.values[3]}
                          /> : null}
                      </div>
                      {value}
                    </div>
                  </Table.Td>
                );
              }
              if (index === 2) {
                return <Table.Td key={`${row.id}-${value}`}>{value}</Table.Td>;
              }

              if (index === 1) {
                const valueDef = typeof value === 'string' ? value : '';
                return (
                  <Table.Td key={`${row.id}-${value}`}>
                    {dateFormatter({
                      date: valueDef,
                    })}
                  </Table.Td>
                );
              }

              return null;
            })}
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}

export default CustomTable;
