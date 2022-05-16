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
    <div className="min-h-screen max-h-screen overflow-y-auto">
      <div>Reservations</div>
      <div
        key={hotel.id}
        className="hotel max-w-[300px] min-w-[80px]
        hover:scale-110 box-content p-2 hover:bg-[#9867f5] hover:text-white rounded-xl"
      >
        <div className="imageContainer w-[300px] h-[170px]">
          <img
            className="w-full h-full rounded-lg"
            src={`${API_URL}${hotel?.image?.url}`}
            alt={hotel.name}
          />
        </div>
        <div className="text-gray-400 hover:text-white">
          <h2 className="hotelName my-3 text-black text-lg font-black text-center">
            {hotel.name}
          </h2>
          <div className="text-center mb-3 text-gray-400">
            -----------------------
          </div>
          <p>{`Location: ${hotel.location}`}</p>
          <p>{`Rating: ${hotel.rating}`}</p>
          <p>{`Description: ${hotel.description}`}</p>
        </div>
        { hotel?.hotel_rooms?.map((room) => (
          <HotelRoom key={room.id} hotelRoom={room} />
        ))}
      </div>
    </div>
  );
};

export default HotelDetails;
