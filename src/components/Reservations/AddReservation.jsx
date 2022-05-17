import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import { putReservation } from '../../redux/Reservation/reservation';

const useQuery = () => {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const getTodaysDate = () => (
  new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0]
);

const AddReservation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hotels = useSelector((state) => state.hotels.hotels);
  const [hotelsSelectValue, setHotelsSelectValue] = useState('');
  const [hotelRoomsSelectValue, setHotelRoomsSelectValue] = useState('');
  const [startDate, setStartDate] = useState(getTodaysDate());

  let query = useQuery();
  const hotelId = query.get("hotelId");
  const hotelRoomId = query.get("hotelRoomId");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(hotelRoomsSelectValue);
    console.log(startDate.target.value);
    const reservation = {
      "hotel_room_id": hotelRoomsSelectValue,
      "date": startDate.target.value
    } 

    dispatch(putReservation(reservation));
    navigate('/myreservations');
    // after submit navigate to my reservations
    // const hotel = hotelsSelectValue;
    // const hotelRoom = hotel.hotel_rooms.find((hotelRoom) => hotelRoom.id === hotelRoomsSelectValue); 
  }


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
    <form onSubmit={submitHandler}>
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
      <input required name="reservDate" type="date" min={getTodaysDate()} onChange={setStartDate}/>
      <div>{hotels.find((hotel) => hotel.id === parseInt(hotelsSelectValue, 10))?.hotel_rooms?.find((room) => room.id == parseInt(hotelRoomsSelectValue, 10))?.price}</div>
      </div>
      <input name="reservSubmit" type="submit" value="Book Hotel Room" /> 
    </form>
  );
};

export default AddReservation;