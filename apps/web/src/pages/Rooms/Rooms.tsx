import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import styles from './Rooms.module.css';
import { roomQueryKeys } from '@/services/rooms/request';
import CustomTable from '@/components/CustomTable';
import type { Room } from '@/models/room';
import { dateFormatter } from '@/utils/dateFormatter';

const columnHelper = createColumnHelper<Room>();

const columns = [
  columnHelper.accessor('name', {
    cell: (info) => {
      return <span className={styles.span}>{info.getValue()}</span>;
    },
    header: () => <span>Name</span>,
  }),
  columnHelper.accessor('createdAt', {
    header: () => 'Created At',
    cell: (info) => (
      <span>{dateFormatter({ date: info.renderValue() ?? '' })}</span>
    ),
  }),
];

function Rooms() {
  const { data } = useQuery({ ...roomQueryKeys.list() });

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={styles.main}>
      <h1>Rooms</h1>
      <CustomTable table={table} />
    </div>
  );
}

export default Rooms;
