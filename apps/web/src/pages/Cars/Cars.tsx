import { useQuery } from '@tanstack/react-query';
import React from 'react';
import styles from './Cars.module.css';
import { carQueryKeys } from '@/services/cars/request';
import CustomTable from '@/components/CustomTable';


const COLUMNS = ['Model', 'Created At', 'Mileage']

function Cars() {
  const { data } = useQuery({ ...carQueryKeys.list() });

  const rows = data?.map((car) => {
    return {id: car.id, values: [car.model, car.createdAt, car.mileage]}
  }) || []

  
  return (
    <div className={styles.main}>
      <h1>Cars</h1>
      <CustomTable columns={COLUMNS} rows={rows} />
    </div>
  );
}

export default Cars;
