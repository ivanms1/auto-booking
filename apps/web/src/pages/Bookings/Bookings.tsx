import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useDisclosure } from '@mantine/hooks';
import BookingDrawer from './BookingDrawer';
import DrawerCreate from './DrawerCreate';
import styles from './Bookings.module.css';
import Button from '@/components/Button';
import type { Booking } from '@/models/booking';
import { bookingQueryKeys } from '@/services/bookings/request';
import { carQueryKeys } from '@/services/cars/request';
import { roomQueryKeys } from '@/services/rooms/request';

interface Event {
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
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const { data: carData } = useQuery({ ...carQueryKeys.list() });
  const { data: roomData } = useQuery({ ...roomQueryKeys.list() });

  const mappedBookings = bookings?.map((booking) => ({
    id: booking.id,
    title: booking.title,
    start: booking.startDate,
    end: booking.endDate,
    extendedProps: { booking },
  }));

  const renderEventWithOpen = (eventInfo: Event) => {
    const booking = eventInfo.event.extendedProps.booking;
    return renderEventContent(eventInfo, () => {
      setSelectedBooking(booking);
    });
  };

  return (
    <div className={styles.main}>
      <BookingDrawer
        onClose={() => {
          setSelectedBooking(null);
        }}
        selectedBooking={selectedBooking}
      />
      <DrawerCreate
        carData={carData}
        onClose={close}
        opened={opened}
        roomData={roomData}
      />
      <div className={styles.title}>
        <h1>Bookings</h1>
        <Button onClick={open} size='lg' variant='success'>
          CREATE BOOKING
        </Button>
      </div>
      <FullCalendar
        eventContent={renderEventWithOpen}
        events={mappedBookings}
        initialView='dayGridMonth'
        plugins={[dayGridPlugin, interactionPlugin]}
      />
    </div>
  );
}

function renderEventContent(
  eventInfo: Event,
  openProp: React.MouseEventHandler<HTMLButtonElement> | undefined
) {
  return (
    <button
      className={styles.bookingDescription}
      onClick={openProp}
      type='button'
    >
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </button>
  );
}

export default Bookings;
