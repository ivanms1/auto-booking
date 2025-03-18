import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useDisclosure } from '@mantine/hooks';
import type { EventApi } from '@fullcalendar/core';
import BookingDrawer from './BookingDrawer';
import DrawerCreate from './DrawerCreate';
import styles from './Bookings.module.css';
import Button from '@/components/Button';
import type { Booking } from '@/models/booking';
import { bookingQueryKeys } from '@/services/bookings/request';
import { carQueryKeys } from '@/services/cars/request';
import { roomQueryKeys } from '@/services/rooms/request';
import { userQueryKeys } from '@/services/users/request';

interface Event {
  timeText: string;
  event: {
    title: string;
    extendedProps: {
      booking: Booking;
    };
  };
}

function BookingsRoom() {
  const { data: bookings } = useQuery({ ...bookingQueryKeys.list() });
  const { data: users } = useQuery({ ...userQueryKeys.list() });
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const { data: carData } = useQuery({ ...carQueryKeys.list() });
  const { data: roomData } = useQuery({ ...roomQueryKeys.list() });

  const filteredBookings = bookings?.filter((booking) => booking.roomId);

  const getColorForRoomId = (roomId: string | undefined): string => {
    const colors = [
      'rgba(255, 87, 51, 0.5)',  // Color 1 con transparencia
      'rgba(51, 255, 87, 0.5)',  // Color 2 con transparencia
      'rgba(51, 87, 255, 0.5)',  // Color 3 con transparencia
      'rgba(255, 51, 161, 0.5)', // Color 4 con transparencia
      'rgba(51, 255, 245, 0.5)', // Color 5 con transparencia
      'rgba(255, 255, 51, 0.5)', // Color 6 con transparencia
      'rgba(255, 153, 51, 0.5)', // Color 7 con transparencia
      'rgba(153, 51, 255, 0.5)', // Color 8 con transparencia
      'rgba(51, 255, 153, 0.5)', // Color 9 con transparencia
      'rgba(255, 51, 51, 0.5)',  // Color 10 con transparencia
      'rgba(51, 153, 255, 0.5)', // Color 11 con transparencia
      'rgba(255, 51, 255, 0.5)', // Color 12 con transparencia
      'rgba(153, 255, 51, 0.5)', // Color 13 con transparencia
      'rgba(51, 255, 51, 0.5)',  // Color 14 con transparencia
      'rgba(255, 153, 153, 0.5)',// Color 15 con transparencia
      'rgba(51, 51, 255, 0.5)',  // Color 16 con transparencia
      'rgba(255, 51, 153, 0.5)', // Color 17 con transparencia
      'rgba(51, 255, 255, 0.5)', // Color 18 con transparencia
      'rgba(255, 255, 153, 0.5)',// Color 19 con transparencia
      'rgba(153, 51, 51, 0.5)',  // Color 20 con transparencia
      'rgba(153, 255, 255, 0.5)', // Color 21 con transparencia
      'rgba(255, 153, 255, 0.5)', // Color 22 con transparencia
      'rgba(153, 255, 153, 0.5)', // Color 23 con transparencia
      'rgba(255, 255, 204, 0.5)', // Color 24 con transparencia
      'rgba(204, 204, 255, 0.5)', // Color 25 con transparencia
      'rgba(204, 255, 204, 0.5)', // Color 26 con transparencia
      'rgba(255, 204, 204, 0.5)', // Color 27 con transparencia
      'rgba(204, 204, 204, 0.5)', // Color 28 con transparencia
      'rgba(255, 204, 153, 0.5)', // Color 29 con transparencia
      'rgba(204, 153, 255, 0.5)', // Color 30 con transparencia
      'rgba(153, 204, 255, 0.5)', // Color 31 con transparencia
      'rgba(255, 204, 51, 0.5)',  // Color 32 con transparencia
      'rgba(204, 51, 255, 0.5)',  // Color 33 con transparencia
      'rgba(51, 204, 255, 0.5)',  // Color 34 con transparencia
      'rgba(255, 51, 204, 0.5)',  // Color 35 con transparencia
      'rgba(204, 255, 51, 0.5)',  // Color 36 con transparencia
      'rgba(51, 255, 204, 0.5)',  // Color 37 con transparencia
      'rgba(255, 51, 153, 0.5)',  // Color 38 con transparencia
      'rgba(153, 51, 255, 0.5)',  // Color 39 con transparencia
      'rgba(51, 153, 255, 0.5)',  // Color 40 con transparencia
      'rgba(255, 153, 51, 0.5)',  // Color 41 con transparencia
      'rgba(153, 255, 51, 0.5)',  // Color 42 con transparencia
      'rgba(51, 255, 153, 0.5)',  // Color 43 con transparencia
      'rgba(255, 51, 51, 0.5)',   // Color 44 con transparencia
      'rgba(51, 153, 51, 0.5)',   // Color 45 con transparencia
      'rgba(153, 51, 51, 0.5)',   // Color 46 con transparencia
      'rgba(51, 51, 153, 0.5)',   // Color 47 con transparencia
      'rgba(153, 51, 153, 0.5)',  // Color 48 con transparencia
      'rgba(51, 153, 153, 0.5)',  // Color 49 con transparencia
      'rgba(153, 153, 51, 0.5)',  // Color 50 con transparencia
    ];
    if (!roomId) return 'rgba(0, 0, 0, 0.5)';
    const index = roomId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index];
  };
  const mappedBookings = filteredBookings?.map((booking) => ({
    id: booking.id,
    title: booking.title,
    start: booking.startDate,
    end: booking.endDate,
    extendedProps: { booking },
    description: booking.description,
    backgroundColor: getColorForRoomId(booking.roomId),
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
        carData={carData}
        onClose={() => {
          setSelectedBooking(null);
        }}
        roomData={roomData}
        selectedBooking={selectedBooking}
        users={users}
      />
      <DrawerCreate
        carData={carData}
        onClose={close}
        opened={opened}
        roomData={roomData}
      />
      <div className={styles.title}>
        <h1>Room Bookings</h1>
        <Button onClick={open} size='lg' variant='success'>
          CREATE BOOKING
        </Button>
      </div>
      <FullCalendar
        eventContent={renderEventWithOpen}
        eventDidMount={(info: { event: EventApi; el: HTMLElement }) => {
                  info.el.style.backgroundColor = (info.event.extendedProps.booking as Booking & { backgroundColor: string }).backgroundColor;
                }}
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
      style={{ width: '100%', height: '100%', border: 'none', background: 'transparent', padding: 0, cursor: 'pointer' }}
      type='button'
    >
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </button>
  );
}

export default BookingsRoom;