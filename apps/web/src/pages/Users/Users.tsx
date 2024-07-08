import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { userQueryKeys } from '@/services/users/request';
import CustomTable from '@/components/CustomTable';


const COLUMNS = ['User Name', 'User Email', 'Created At']


function Users() {
  
  const { data } = useQuery({ ...userQueryKeys.list()});

  const rows = data?.map((user) => {
    return {id: user.id, values: [user.name, user.email, user.createdAt]}
  }) || []

  return (
    <div>
      <h1>Users</h1>
      <CustomTable columns={COLUMNS} rows={rows} />
    </div>
  );
}

export default Users;
