import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import styles from './Users.module.css';
import { userQueryKeys } from '@/services/users/request';
import CustomTable from '@/components/CustomTable';
import type { User } from '@/models/user';
import { dateFormatter } from '@/utils/dateFormatter';
import useGetCurrentUser from '@/hooks/useGetCurrentUser';
import Button from '@/components/Button';

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor('name', {
    cell: (info) => {
      const { avatar } = info.row.original;
      return (
        <span className={styles.span}>
          <div className={styles.avatarContent}>
            <img alt='profile' className={styles.profilePicture} src={avatar} />
          </div>
          {info.getValue()}
        </span>
      );
    },
    header: () => <span>Name</span>,
  }),
  columnHelper.accessor('createdAt', {
    header: () => 'Created At',
    cell: (info) => (
      <span>{dateFormatter({ date: info.renderValue() ?? '' })}</span>
    ),
  }),
  columnHelper.accessor('email', {
    header: () => <span>Email</span>,
    cell: (info) => info.renderValue(),
  }),
];

function Users() {
  const { data } = useQuery({ ...userQueryKeys.list() });
  const { user } = useGetCurrentUser();
  const navigate = useNavigate();

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={styles.main}>
      <div>
        <h1>
          Users
          {user?.role === 'ADMIN' ? (
            <Button
              onClick={() => {
                navigate('/bookingscar');
              }}
              outline
            >
              Add User
            </Button>
          ) : (
            ''
          )}
        </h1>
      </div>
      <CustomTable<User> table={table} />
    </div>
  );
}

export default Users;
