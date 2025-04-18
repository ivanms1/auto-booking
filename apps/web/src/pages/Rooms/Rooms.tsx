import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import styles from './Rooms.module.css';
import { roomQueryKeys } from '@/services/rooms/request';
import CustomTable from '@/components/CustomTable';
import type { Room } from '@/models/room';
import { dateFormatter } from '@/utils/dateFormatter';
import Button from '@/components/Button';

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
  const navigate = useNavigate();

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={styles.main}>
      <h1>Rooms<Button onClick={()=> { navigate('/bookingsroom'); }} outline>Calendar</Button></h1>
      <CustomTable<Room> table={table} />
    </div>
  );
}

export default Rooms;
