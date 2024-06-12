import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { bookingQueryKeys } from '@/services/bookings/request';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import styles from './Bookings.module.css';
import { useDisclosure } from '@mantine/hooks';
import { Drawer } from '@mantine/core';
import { Booking } from '@/models/booking';

interface event {
  timeText: string;
  event: {
    title: string;
    extendedProps: {
      booking: Booking;
    };
  };
}

function Bookings() {
  const { data: bookings } = useQuery({ ...bookingQueryKeys.list() });
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const mappedBookings = bookings?.map((booking) => ({
    id: booking.id,
    title: booking.title,
    start: booking.startDate,
    end: booking.endDate,
    extendedProps: { booking },
  }));

  const handleEventClick = (booking: Booking) => {
    setSelectedBooking(booking);
    open();
  };

  const renderEventWithOpen = (eventInfo: event) => {
    const booking = eventInfo.event.extendedProps.booking;
    return renderEventContent(eventInfo, () => handleEventClick(booking));
  };

  return (
    <div className={styles.main}>
      <Drawer opened={opened} onClose={close} title='Detalles de la Reserva'>
        {selectedBooking && (
          <div>
            <h1>{selectedBooking.title}</h1>
            <p>Start: {selectedBooking.startDate.toString()}</p>
            <p>End: {selectedBooking.endDate.toString()}</p>
            {selectedBooking.description && (
              <>
                <p>Description:</p>
                <p>{selectedBooking.description}</p>
              </>
            )}
          </div>
        )}
      </Drawer>
      <h1>Bookings</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        events={mappedBookings}
        eventContent={renderEventWithOpen}
      />
    </div>
  );
}

function renderEventContent(
  eventInfo: event,
  openProp: React.MouseEventHandler<HTMLDivElement> | undefined
) {
  return (
    <div onClick={openProp} className={styles.bookingDescription}>
      <b>{eventInfo.timeText}</b> <i>{eventInfo.event.title}</i>
    </div>
  );
}

export default Bookings;
