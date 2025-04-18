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
import { getColorForCarId } from '@/utils/getColorForCarId';

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
      type='button'
    >
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </button>
  );
}

export default BookingsCar;