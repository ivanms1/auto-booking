import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import styles from './Users.module.css';
import { userQueryKeys } from '@/services/users/request';
import CustomTable from '@/components/CustomTable';
import type { User } from '@/models/user';
import { dateFormatter } from '@/utils/dateFormatter';

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor('name', {
    cell: info => {
      const { avatar } = info.row.original;
      return (
        <span className={styles.span}>
          <div className={styles.avatarContent}><img alt='profile' className={styles.profilePicture} src={avatar}/></div>{info.getValue()}
        </span>
      );
    },
    header: () => <span>Name</span>,
  }),
  columnHelper.accessor('createdAt', {
    header: () => 'Created At',
    cell: (info) => <span>{dateFormatter({date: info.renderValue() ?? ''})}</span>,
  }),
  columnHelper.accessor('email', {
    header: () => <span>Email</span>,
    cell: (info) => info.renderValue(),
  }),
];

function Users() {
  const { data } = useQuery({ ...userQueryKeys.list() });

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={styles.main}>
      <h1>Users</h1>
        <CustomTable table={table} />
    </div>
  );
}

export default Users;
