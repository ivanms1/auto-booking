import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { carQueryKeys } from '@/services/cars/request';
import CustomTable from '@/components/CustomTable';

const COLUMNS = ['Model', 'Mileage', 'Created At']

function Cars() {
  const { data } = useQuery({ ...carQueryKeys.list() });

  const rows = data?.map((car) => {
    return {id: car.id, values: [car.model, car.mileage, car.createdAt]}
  }) || []

  
  return (
    <div>
      <h1>Cars</h1>
      <CustomTable columns={COLUMNS} rows={rows} />
    </div>
  );
}

export default Cars;
