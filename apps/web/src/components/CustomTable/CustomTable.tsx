import React from 'react';
import { flexRender } from '@tanstack/react-table';
import styles from './Table.module.css';

function CustomTable({ table }) {
  return (
    <table className={styles.table}>
      <thead>
      {table.getHeaderGroups().map((headerGroup: { id: React.Key | null | undefined; headers: any[]; }) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
      </thead>
      <tbody>
      {table.getRowModel().rows.map((row: { id: React.Key | null | undefined; getVisibleCells: () => any[]; }) => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default CustomTable;
