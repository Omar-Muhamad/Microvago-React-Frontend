import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHotelsDetails } from '../../redux/Hotel/hotel';
import { API_URL } from '../../redux/api/apiHelper';
import HotelRoom from './HotelRoom';

const HotelDetails = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchHotelsDetails(id));
  }, []);
  const hotel = useSelector((state) => state.hotels.hotelDetails);

  return (
    <div className="h-hero sm:min-h-screen w-full px-8 sm:px-10 overflow-y-auto text-black border-b-2">
      <div
        id={hotel.id}
        className="hotelContainer mt-14 sm:mt-24 pb-12 grid grid-cols-1 sm:grid-cols-5 gap-6 text-center sm:text-left border-b-2 border-dashed"
      >
        <div className="imageContainer col-span-1 sm:col-span-3 h-[30vh] sm:h-[60vh]">
          <img
            className="w-full h-full rounded-lg bg-[#6D22FB] rounded-tl-[35%] rounded-br-[35%]"
            src={`${API_URL}${hotel?.image?.url}`}
            alt={hotel.name}
          />
        </div>
        <div className="hotelDetails col-span-1 sm:col-span-2">
          <h1 className="hotelName mt-2 text-3xl font-black">{hotel.name}</h1>
          <div className="mb-3 text-gray-400">------------------</div>
          <ul className="detailsList text-md font-medium flex flex-col gap-1">
            <li>Location:</li>
            <li className="py-1 rounded-[5px] text-center">{hotel.location}</li>
            <li>Rating:</li>
            <li className="py-1 rounded-[5px] text-center">{hotel.rating}</li>
            <li>Description:</li>
            <li className="py-1 px-4 rounded-[5px] text-left">
              {hotel.description}
            </li>
          </ul>
        </div>
      </div>
      <div className="hotelRooms w-full my-10 flex flex-col gap-10 items-center">
        <h2 className="hotelName text-3xl font-bold border-b-6 border-dashed">
          Hotel Rooms
        </h2>
        <div className="roomContainer w-full grid grid-cols-1 sm:grid-cols-2 grow justify-center gap-10 sm:gap-12">
          {hotel?.hotel_rooms?.map((room) => (
            <HotelRoom key={room.id} hotelRoom={room} />
          ))}
        </div>
        { hotel?.hotel_rooms?.map((room) => (
          <HotelRoom key={room.id} hotelRoom={room} hotelId={hotel.id} />
        ))}
      </div>
    </div>
  );
};

export default HotelDetails;
