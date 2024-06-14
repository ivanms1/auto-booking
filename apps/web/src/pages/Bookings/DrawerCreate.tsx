import { Drawer } from '@mantine/core';
import React from 'react';
import CreateBookings from '../Create';

function DrawerCreate({opened, onClose}: {opened: boolean, onClose: () => void}, ) {
  return (
    <Drawer opened={opened} onClose={onClose} position='right' size='60%'>
      <CreateBookings />
    </Drawer>
  );
}

export default DrawerCreate;
