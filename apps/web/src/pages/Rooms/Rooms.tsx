import { useQuery } from '@tanstack/react-query';
import React from 'react';
import styles from './Rooms.module.css';
import { roomQueryKeys } from '@/services/rooms/request';
import CustomTable from '@/components/CustomTable';

const COLUMNS = ['Name', 'Created At']

function Rooms() {
  const { data } = useQuery({ ...roomQueryKeys.list() });

  const rows = data?.map((room) => {
    return {id: room.id, values: [room.name, room.createdAt]}
  }) || []

  
  return (
    <div className={styles.main}>
      <h1>Rooms</h1>
      <CustomTable columns={COLUMNS} rows={rows} />
    </div>
  );
}

export default Rooms;
