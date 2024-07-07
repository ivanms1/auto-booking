import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Table } from '@mantine/core';
import { roomQueryKeys } from '@/services/rooms/request';
import CustomTable from '@/components/CustomTable';

function Rooms() {
  const { data } = useQuery({ ...roomQueryKeys.list() });
  const rows: JSX.Element[] | undefined  = data?.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.id}</Table.Td>
    </Table.Tr>
  ))

  const components = ['Name', 'Room ID']
  return (
    <div>
      <h1>Rooms</h1>
      <CustomTable components={components} rows={rows} />
    </div>
  );
}

export default Rooms;
