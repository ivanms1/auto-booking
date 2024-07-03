import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Table } from '@mantine/core';
import { carQueryKeys } from '@/services/cars/request';

function Cars() {
  const { data } = useQuery({ ...carQueryKeys.list() });

  const rows = data?.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.model}</Table.Td>
      <Table.Td>{element.mileage}</Table.Td>
      <Table.Td>{element.id}</Table.Td>
    </Table.Tr>
  ))
  return (
    <div>
      <h1>Cars</h1>
      <Table highlightOnHover horizontalSpacing='xl'>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Model</Table.Th>
          <Table.Th>Mileage</Table.Th>
          <Table.Th>Car ID</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
}

export default Cars;
