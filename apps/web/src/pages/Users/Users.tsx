import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Table } from '@mantine/core';
import { userQueryKeys } from '@/services/users/request';

function Users() {
  
  const { data } = useQuery({ ...userQueryKeys.list()});

  const rows = data?.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.email}</Table.Td>
      <Table.Td>{element.id}</Table.Td>
    </Table.Tr>
  ))
  
  return (
    <div>
      <h1>Users</h1>
      <Table highlightOnHover horizontalSpacing='xl'>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>User Name</Table.Th>
          <Table.Th>User Email</Table.Th>
          <Table.Th>User ID</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
}

export default Users;
