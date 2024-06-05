import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { bookingQueryKeys } from '@/services/bookings/request';
function Bookings() {
  const { data } = useQuery({ ...bookingQueryKeys.list() });
  return (
    <div>
      <h1>Hello Bookings</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default Bookings;
