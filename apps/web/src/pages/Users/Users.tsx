import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Table } from '@mantine/core';
import { userQueryKeys } from '@/services/users/request';
import CustomTable from '@/components/CustomTable';

function Users() {
  
  const { data } = useQuery({ ...userQueryKeys.list()});

  const rows: JSX.Element[] | undefined  = data?.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.email}</Table.Td>
      <Table.Td>{element.id}</Table.Td>
    </Table.Tr>
  ))

  const components = ['User Name', 'User Email', 'User ID']
  
  return (
    <div>
      <h1>Users</h1>
      <CustomTable components={components} rows={rows} />
    </div>
  );
}

export default Users;
