import { Booking } from '@/models/booking';
import { Drawer } from '@mantine/core';
import React from 'react';

function DrawerComponent({selectedBooking, onClose}:  {selectedBooking: Booking | null, onClose: () => void}, ) {
  return (
    <Drawer opened={!!selectedBooking} onClose={onClose} title='Detalles de la Reserva' position='right'>
      {selectedBooking && (
        <div>
          <h1>{selectedBooking.title}</h1>
          <p>Start: {selectedBooking.startDate?.toString()}</p>
          <p>End: {selectedBooking.endDate?.toString()}</p>
          {selectedBooking.description && (
            <>
              <p>Description:</p>
              <p>{selectedBooking.description}</p>
            </>
          )}
        </div>
      )}
    </Drawer>
  );
}

export default DrawerComponent;
