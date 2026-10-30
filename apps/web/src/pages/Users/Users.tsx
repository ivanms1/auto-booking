import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useDisclosure } from '@mantine/hooks';
import styles from './Users.module.css';
import CreateUserDrawer from './CreateUserDrawer';
import { userQueryKeys } from '@/services/users/request';
import CustomTable from '@/components/CustomTable';
import type { User } from '@/models/user';
import { dateFormatter } from '@/utils/dateFormatter';
import useGetCurrentUser from '@/hooks/useGetCurrentUser';
import Button from '@/components/Button';
import ProfilePicture from '@/assets/svg/27716.svg?react';

const columnHelper = createColumnHelper<User>();

function UserAvatar({ src }: { src?: string | null }) {
  const [imageFailed, setImageFailed] = useState(false);

  if (!src || imageFailed) {
    return <ProfilePicture className={styles.fallbackAvatar} />;
  }

  return (
    <img
      alt='Profile'
      className={styles.profilePicture}
      onError={() => {
        setImageFailed(true);
      }}
      src={src}
    />
  );
}

const columns = [
  columnHelper.accessor('name', {
    cell: (info) => {
      const { avatar } = info.row.original;
      return (
        <span className={styles.span}>
          <div className={styles.avatarContent}>
            <UserAvatar src={avatar} />
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
  const [opened, { open, close }] = useDisclosure(false);

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
            <Button onClick={open} outline>
              Add User
            </Button>
          ) : null}
        </h1>
      </div>
      <CustomTable<User> table={table} />
      <CreateUserDrawer onClose={close} opened={opened} />
    </div>
  );
}

export default Users;
