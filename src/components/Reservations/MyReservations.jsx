import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../../redux/api/apiHelper';
import { fetchReservation, deleteReservation } from '../../redux/Reservation/reservation';
import { startLoading, stopLoading } from '../../redux/UI/ui';

import Spinner from '../Spinner/Spinner';

const MyReservations = () => {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reservations.reservation);
  const hotels = useSelector((state) => state.hotels.hotels);
  const rooms = useSelector((state) => state.rooms.rooms);
  const isLoading = useSelector((state) => state.ui.isLoading);
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
        const image = hotel?.hotel_rooms.find(
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
    dispatch(startLoading());
    dispatch(fetchReservation()).then(() => {
      dispatch(stopLoading());
    });
  }, []);

  const handleDelete = (id) => {
    dispatch(startLoading());
    dispatch(deleteReservation(id)).then(() => {
      dispatch(stopLoading());
    });
  };

  return (
    <div className="h-hero sm:max-h-screen sm:min-h-screen h-full w-full overflow-y-auto text-center flex flex-col px-6 sm:px-14 py-10 sm:py-20">
      <div className="titleContainer flex flex-col items-center justify-end gap-3 text-gray-400">
        <h1 className="text-4xl sm:text-6xl font-bold text-gray-700">My Reservations</h1>
      </div>
      { isLoading && <Spinner classes="bg-black" /> }
      {!isLoading && reservationsToDisplay.length === 0 && (
        <div className="text-2xl text-gray-400 grow text-center font-bold select-none flex items-center justify-center">No reservations yet.</div>
      )}
      {!isLoading && hotels.length > 0 && (
      <ul className="w-full grid grid-cols-1 sm:grid-cols-2 sm:flex-row gap-8 sm:gap-12 mt-8 sm:mt-14">
        {reservationsToDisplay?.map((reservation) => (
          <li className="w-full border-2 rounded-[15px] sm:rounded-[30px] p-[20px] sm:p-[30px] shadow-xl" key={reservation.id}>
            <div className="w-full h-[200px] sm:h-[300px]">
              <img className="w-full h-full bg-[#6D22FB] rounded-xl" src={reservation.imageSrc} alt="Hotel room reserved" />
            </div>
            <ul className="detailsList w-full mt-6 text-lg font-medium flex flex-col gap-1">
              <li>Hotel: </li>
              <li className="py-1 rounded-[5px] text-center">{reservation.hotelName}</li>
              <li>Room: </li>
              <li className="py-1 rounded-[5px] text-center">{reservation.roomType}</li>
              <li>Price: </li>
              <li className="py-1 rounded-[5px] text-center">{`${reservation.price} $`}</li>
              <li>Reservation Date:</li>
              <li className="py-1 rounded-[5px] text-center">{reservation.date}</li>
              <button className="my-5 text-xl font-medium bg-red-500 rounded-[10px] p-3 text-white" type="button" onClick={() => handleDelete(reservation.id)}>
                Cancel reservation
              </button>
            </ul>
          </li>
        ))}
      </ul>
      )}
    </div>
  );
};

export default MyReservations;
