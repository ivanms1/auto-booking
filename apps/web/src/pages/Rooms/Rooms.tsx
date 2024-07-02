import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { roomQueryKeys } from '@/services/rooms/request';

function Rooms() {
  const { data } = useQuery({ ...roomQueryKeys.list() });
  return (
    <div>
      <h1>Hello Rooms</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default Rooms;
