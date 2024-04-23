import React from 'react';
import { useQueries, useQuery } from '@tanstack/react-query';
import { userQueryKeys } from '@/services/users/request';

function Users() {
  const { data } = useQuery({ ...userQueryKeys.list() });
  return (
    <div>
      <h1>Hello Users</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default Users;
