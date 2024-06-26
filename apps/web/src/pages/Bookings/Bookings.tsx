import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { bookingQueryKeys } from '@/services/bookings/request';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import styles from './Bookings.module.css';
import { Booking } from '@/models/booking';
import BookingDrawer from './BookingDrawer';
import Button from '@/components/Button';
import { useDisclosure } from '@mantine/hooks';
import DrawerCreate from './DrawerCreate';
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
    return renderEventContent(eventInfo, () => setSelectedBooking(booking));
  };

  return (
    <div className={styles.main}>
      <BookingDrawer
        selectedBooking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
      <DrawerCreate
        opened={opened}
        onClose={close}
        carData={carData}
        roomData={roomData}
      />
      <div className={styles.title}>
        <h1>Bookings</h1>
        <Button size='lg' variant='success' onClick={open}>
          CREATE BOOKING
        </Button>
      </div>
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
  eventInfo: Event,
  openProp: React.MouseEventHandler<HTMLDivElement> | undefined
) {
  return (
    <div onClick={openProp} className={styles.bookingDescription}>
      <b>{eventInfo.timeText}</b> <i>{eventInfo.event.title}</i>
    </div>
  );
}

export default Bookings;
