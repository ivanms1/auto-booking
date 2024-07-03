import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Table } from '@mantine/core';
import { roomQueryKeys } from '@/services/rooms/request';

function Rooms() {
  const { data } = useQuery({ ...roomQueryKeys.list() });
  const rows = data?.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.id}</Table.Td>
    </Table.Tr>
  ))
  return (
    <div>
      <h1>Rooms</h1>
      <Table highlightOnHover horizontalSpacing='xl'>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Room Id</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
}

export default Rooms;
