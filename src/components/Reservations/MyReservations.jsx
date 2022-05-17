import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const MyReservations = () => {
  const reservations = useSelector((state) => state.reservations.reservation);
  
  return (
    <>
      <div>My Reservations</div>
      { reservations?.map((reservation) => (
        <div key={reservation.id}>
          <div>{reservation.hotel_room_id}</div>
          <div>{reservation.date}</div>
        </div>
      ))}
    </>
  );
};

export default MyReservations;
