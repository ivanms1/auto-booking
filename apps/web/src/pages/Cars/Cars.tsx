import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { carQueryKeys } from '@/services/cars/request';

function Cars() {
  const { data } = useQuery({ ...carQueryKeys.list() });
  return (
    <div>
      <h1>Hello Cars</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default Cars;
