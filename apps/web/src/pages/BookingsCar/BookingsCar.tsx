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

function BookingsCar() {
  const { data: bookings } = useQuery({ ...bookingQueryKeys.list() });
  const { data: users } = useQuery({ ...userQueryKeys.list() });
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const { data: carData } = useQuery({ ...carQueryKeys.list() });
  const { data: roomData } = useQuery({ ...roomQueryKeys.list() });

  const filteredBookings = bookings?.filter((booking) => booking.carId);

  const getColorForCarId = (carId: string | undefined): string => {
    const colors = [
      'rgba(255, 87, 51, 0.5)',
      'rgba(51, 255, 87, 0.5)',
      'rgba(51, 87, 255, 0.5)',
      'rgba(255, 51, 161, 0.5)',
      'rgba(51, 255, 245, 0.5)',
      'rgba(255, 255, 51, 0.5)',
      'rgba(255, 153, 51, 0.5)',
      'rgba(153, 51, 255, 0.5)',
      'rgba(51, 255, 153, 0.5)',
      'rgba(255, 51, 51, 0.5)',
      'rgba(51, 153, 255, 0.5)',
      'rgba(255, 51, 255, 0.5)',
      'rgba(153, 255, 51, 0.5)',
      'rgba(51, 255, 51, 0.5)',
      'rgba(255, 153, 153, 0.5)',
      'rgba(51, 51, 255, 0.5)',
      'rgba(255, 51, 153, 0.5)',
      'rgba(51, 255, 255, 0.5)',
      'rgba(255, 255, 153, 0.5)',
      'rgba(153, 51, 51, 0.5)',
    ];
    if (!carId) return 'rgba(0, 0, 0, 0.5)';
    const index = carId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index];
  };

  const mappedBookings = filteredBookings?.map((booking) => ({
    id: booking.id,
    title: booking.title,
    start: booking.startDate,
    end: booking.endDate,
    extendedProps: { booking },
    description: booking.description,
    backgroundColor: getColorForCarId(booking.carId),
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
        <h1>Car Bookings</h1>
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

export default BookingsCar;