import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../../redux/api/apiHelper';
import { fetchReservation, deleteReservation } from '../../redux/Reservation/reservation';

const MyReservations = () => {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reservations.reservation);
  const hotels = useSelector((state) => state.hotels.hotels);
  const rooms = useSelector((state) => state.rooms.rooms);
  const [reservationsToDisplay, setReservationsToDisplay] = useState([]);

  useEffect(() => {
    if (hotels.length > 0 && reservations.length >= 0 && rooms.length > 0) {
      const newReservations = [];
      reservations.forEach((reserv) => {
        const resrvExtension = {};
        const hotel = hotels.find(
          (hotel) => hotel.id === reserv.hotel_room.hotel_id,
        );
        const room = rooms.find(
          (room) => room.id === reserv.hotel_room.room_id,
        );
        const image = hotel.hotel_rooms.find(
          (hr) => hr.id === reserv.hotel_room.id,
        ).featured_room_image;

        resrvExtension.hotelName = hotel.name;
        resrvExtension.roomType = room.type;
        resrvExtension.price = reserv.hotel_room.price;
        resrvExtension.imageSrc = `${API_URL}${image.url}`;

        newReservations.push({ ...reserv, ...resrvExtension });
      });
      setReservationsToDisplay(newReservations);
    }
  }, [reservations, hotels, rooms]);

  useEffect(() => {
    dispatch(fetchReservation());
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteReservation(id));
  };

  return (
    <>
      <div>My Reservations</div>
      {reservationsToDisplay?.map((reservation) => (
        <div key={reservation.id}>
          <div>
            <img src={reservation.imageSrc} alt="Hotel room reserved" />
          </div>
          <div>{reservation.hotelName}</div>
          <div>{reservation.roomType}</div>
          <div>{reservation.price}</div>
          <div>{reservation.date}</div>
          <button type="button" onClick={() => handleDelete(reservation.id)}>
            Delete
          </button>
        </div>
      ))}
    </>
  );
};

export default MyReservations;
