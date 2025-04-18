import { useQuery } from '@tanstack/react-query';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Cars.module.css';
import { carQueryKeys } from '@/services/cars/request';
import CustomTable from '@/components/CustomTable';
import type { Car } from '@/models/car';
import { dateFormatter } from '@/utils/dateFormatter';
import Button from '@/components/Button';

const columnHelper = createColumnHelper<Car>();

const columns = [
  columnHelper.accessor('model', {
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
  columnHelper.accessor('mileage', {
    header: () => <span>Mileage</span>,
    cell: (info) => info.renderValue(),
  }),
];

function Cars() {
  const { data } = useQuery({ ...carQueryKeys.list() });
  const navigate = useNavigate();

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={styles.main}>
      <h1>Cars<Button onClick={()=> { navigate('/bookingscar'); }} outline>Calendar</Button></h1>
      <CustomTable<Car> table={table} />
    </div>
  );
}

export default Cars;
