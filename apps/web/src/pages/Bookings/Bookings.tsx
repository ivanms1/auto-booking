import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { bookingQueryKeys } from '@/services/bookings/request';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction"
import styles from './Bookings.module.css';

interface event {
  timeText: string,
  event: {
    title: string
  }
}

function Bookings() {
  const { data: bookings } = useQuery({ ...bookingQueryKeys.list() });

  const mappedBookings = bookings?.map(booking => ({
    id: booking.id,
    title: booking.title,
    start: booking.startDate,
    end: booking.endDate
  }));
  

  // const handleDateClick = (arg) => {
  //   alert(arg.dateStr)
  // }
  return (
    <div className={styles.main}>
      <h1>Bookings</h1>
      <FullCalendar
      plugins={[ dayGridPlugin, interactionPlugin ]}
      initialView="dayGridMonth"
      //dateClick={handleDateClick}
      events={mappedBookings}
      eventContent={renderEventContent}
    />
    </div>
  );
}

function renderEventContent(eventInfo: event) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}


export default Bookings;
