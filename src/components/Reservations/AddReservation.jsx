import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";

const useQuery = () => {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const getTodaysDate = () => (
  new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0]
);

const AddReservation = () => {
  const hotels = useSelector((state) => state.hotels.hotels);
  const [hotelsSelectValue, setHotelsSelectValue] = useState('');
  const [hotelRoomsSelectValue, setHotelRoomsSelectValue] = useState('');

  let query = useQuery();
  const hotelId = query.get("hotelId");
  const hotelRoomId = query.get("hotelRoomId");
  useEffect(() => {
    if(hotelId) {
      setHotelsSelectValue(hotelId);
      setHotelRoomsSelectValue(hotelRoomId);
    }
  }, [hotelId, hotelRoomId])

  // const hotelsSelectChangeHandler = (e) => {
  //   setHotelsSelectValue(e.target.value)
  //   const hotelRoom = hotels.find((hotel) => hotel.id === parseInt(e.target.value, 10))?.hotel_rooms[0];
  //   setHotelRoomsSelectValue(hotelRoom.id);
  // }

  useEffect(() => {
    if(hotelsSelectValue !== '' && !hotelId) {
      const hotelRoom = hotels.find((hotel) => hotel.id === parseInt(hotelsSelectValue, 10))?.hotel_rooms[0];
      setHotelRoomsSelectValue(hotelRoom.id);
    }
  },[hotelsSelectValue])

  return (
    <form>
      <div>
      <select value={hotelsSelectValue || 'none'} onChange={(e) => setHotelsSelectValue(e.target.value)} disabled={hotelId}>
        <option disabled value='none'>Select hotel</option>
        {hotels.map((hotel) => (
          <option key={hotel.id} value={hotel.id}>{hotel.name}</option>
        ))}
      </select>
      <select value={hotelRoomsSelectValue} onChange={(e)=>setHotelRoomsSelectValue(e.target.value)} >
        {hotels.find((hotel) => hotel.id === parseInt(hotelsSelectValue, 10))?.hotel_rooms?.map((hotelRoom) => (
          <option key={hotelRoom.id} value={hotelRoom.id}>{hotelRoom.room.type}</option>
        ))}
      </select>
      <input type="date" min={getTodaysDate()} />
      <div>{hotels.find((hotel) => hotel.id === parseInt(hotelsSelectValue, 10))?.hotel_rooms?.find((room) => room.id == parseInt(hotelRoomsSelectValue, 10))?.price}</div>
      </div>
    </form>
  );
};

export default AddReservation;