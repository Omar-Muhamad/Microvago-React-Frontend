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
    <div className="sm: w-screen flex flex-col justify-center items-center gap-10 pb-10">
      <h1 className="pt-24 md:pt-8 text-3xl font-bold border-b-6 border-dashed">My Reservations</h1>
      {reservationsToDisplay?.map((reservation) => (
        <div className="md:w-1/3 border-2 rounded-[15px] sm:rounded-[30px] p-[20px] sm:p-[30px] shadow-xl" key={reservation.id}>
          <div className="w-full h-[200px] sm:h-[300px]">
            <img className="w-fit h-full bg-[#6D22FB] rounded-xl" src={reservation.imageSrc} alt="Hotel room reserved" />
          </div>
          <ul className="detailsList mt-6 text-lg font-medium flex flex-col gap-1">
            <li>Hotel: </li>
            <li className="py-1 rounded-[5px] text-center">{reservation.hotelName}</li>
            <li>Room: </li>
            <li className="py-1 rounded-[5px] text-center">{reservation.roomType}</li>
            <li>Price: </li>
            <li className="py-1 rounded-[5px] text-center">
              $
              {reservation.price}
              {' '}
              USD
            </li>
            <li>Reservation Date:</li>
            <li className="py-1 rounded-[5px] text-center">{reservation.date}</li>
            <button className="my-5 text-2xl bg-red-600 rounded-full p-3 text-white" type="button" onClick={() => handleDelete(reservation.id)}>
              Cancel Reservation
            </button>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MyReservations;
