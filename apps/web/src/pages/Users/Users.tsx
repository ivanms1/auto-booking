import React from 'react';
import { useQuery } from '@tanstack/react-query';
import styles from './Users.module.css';
import { userQueryKeys } from '@/services/users/request';
import CustomTable from '@/components/CustomTable';


const COLUMNS = ['User Name', 'Created At', 'User Email']


function Users() {
  
  const { data } = useQuery({ ...userQueryKeys.list()});
  
  

  const rows = data?.map((user) => {
    return {id: user.id, values: [user.name, user.createdAt, user.email, user.avatar]}
  }) || []

  return (
    <div className={styles.main}>
      <h1>Users</h1>
      <CustomTable columns={COLUMNS} rows={rows} />
    </div>
  );
}

export default Users;
