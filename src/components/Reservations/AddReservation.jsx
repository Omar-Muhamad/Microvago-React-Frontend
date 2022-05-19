import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { putReservation } from '../../redux/Reservation/reservation';

const useQuery = () => {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
};

const getTodaysDate = () => new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
  .toISOString()
  .split('T')[0];

const AddReservation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hotels = useSelector((state) => state.hotels.hotels);
  const [hotelsSelectValue, setHotelsSelectValue] = useState('');
  const [hotelRoomsSelectValue, setHotelRoomsSelectValue] = useState('');
  const [startDate, setStartDate] = useState(getTodaysDate());

  const query = useQuery();
  const hotelId = query.get('hotelId');
  const hotelRoomId = query.get('hotelRoomId');

  const submitHandler = (e) => {
    e.preventDefault();
    const reservation = {
      hotel_room_id: hotelRoomsSelectValue,
      date: startDate.target.value,
    };

    dispatch(putReservation(reservation));
    navigate('/myreservations');
  };

  useEffect(() => {
    if (hotelId) {
      setHotelsSelectValue(hotelId);
      setHotelRoomsSelectValue(hotelRoomId);
    }
  }, [hotelId, hotelRoomId]);

  useEffect(() => {
    if (hotelsSelectValue !== '' && !hotelId) {
      const hotelRoom = hotels.find(
        (hotel) => hotel.id === parseInt(hotelsSelectValue, 10),
      )?.hotel_rooms[0];
      setHotelRoomsSelectValue(hotelRoom.id);
    }
  }, [hotelsSelectValue]);

  return (
    <div className="formContainer splashBG bg-[#6D22FB] h-hero sm:min-h-screen w-full flex items-center justify-center text-white text-center">
      <div className="px-6 py-14 lg:px-20 lg:py-40 h-full w-full w-full overflow-y-auto">
        <h1 className="font-['Comfortaa'] text-white text-3xl font-bold">
          Reserve a Hotel Room
        </h1>
        <form
          onSubmit={submitHandler}
          className="flex flex-col items-center justify-center gap-12 w-full text-lg md:flex-row"
        >
          <div className="flex flex-col sm:flex-row sm:gap-6 md:gap-8">
            <div className="">
              <select
                className="w-full p-3 mt-6 bg-transparent border-2 rounded-full font-medium text-center"
                value={hotelsSelectValue || 'none'}
                onChange={(e) => setHotelsSelectValue(e.target.value)}
                disabled={hotelId}
              >
                <option disabled value="none">
                  Select hotel
                </option>
                {hotels.map((hotel) => (
                  <option key={hotel.id} value={hotel.id}>
                    {hotel.name}
                  </option>
                ))}
              </select>
              <select
                className="w-full p-3 mt-6 bg-transparent border-2 rounded-full font-medium text-center"
                value={hotelRoomsSelectValue}
                onChange={(e) => setHotelRoomsSelectValue(e.target.value)}
              >
                {hotels
                  .find((hotel) => hotel.id === parseInt(hotelsSelectValue, 10))
                  ?.hotel_rooms?.map((hotelRoom) => (
                    <option key={hotelRoom.id} value={hotelRoom.id}>
                      {hotelRoom.room.type}
                    </option>
                  ))}
              </select>
              <input
                className="reserve-date w-full p-3 mt-6 bg-transparent border-2 rounded-full font-medium text-center"
                required
                name="reservDate"
                type="date"
                min={getTodaysDate()}
                onChange={setStartDate}
              />
              <div className="pt-6 font-bold text-xl">
                Price:
                {' '}
                $
                {
                  hotels
                    .find((hotel) => hotel.id === parseInt(hotelsSelectValue, 10))
                    ?.hotel_rooms?.find(
                      (room) => room.id === parseInt(hotelRoomsSelectValue, 10),
                    )?.price
                }
                {' '}
                USD
              </div>
            </div>
          </div>
          <input
            className="bg-white p-3 mt-6 text-[#6d22fb] border-2 rounded-full font-medium text-center"
            name="reservSubmit"
            type="submit"
            value="Book Hotel Room"
          />
        </form>
      </div>
    </div>
  );
};

export default AddReservation;
