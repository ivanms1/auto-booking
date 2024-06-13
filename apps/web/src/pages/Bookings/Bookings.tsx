import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { bookingQueryKeys } from '@/services/bookings/request';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import styles from './Bookings.module.css';
import { Booking } from '@/models/booking';
import DrawerComponent from './DrawerComponent';

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
      <DrawerComponent  selectedBooking={selectedBooking} onClose={() => setSelectedBooking(null)}/>
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
