import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Table } from '@mantine/core';
import { carQueryKeys } from '@/services/cars/request';
import CustomTable from '@/components/CustomTable';

function Cars() {
  const { data } = useQuery({ ...carQueryKeys.list() });

  const rows: JSX.Element[] | undefined  = data?.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.model}</Table.Td>
      <Table.Td>{element.mileage}</Table.Td>
      <Table.Td>{element.id}</Table.Td>
    </Table.Tr>
  ))

  const components = ['Model', 'Mileage', 'Car ID']
  return (
    <div>
      <h1>Cars</h1>
      <CustomTable components={components} rows={rows} />
    </div>
  );
}

export default Cars;
