import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { NavLink } from 'react-router-dom';
import { deleteHotel, fetchHotels } from '../../redux/Hotel/hotel';
import { API_URL } from '../../redux/api/apiHelper';
import { startLoading, stopLoading } from '../../redux/UI/ui';

import Spinner from '../Spinner/Spinner';

const RemoveHotel = () => {
  const dispatch = useDispatch();

  const hotels = useSelector((state) => state.hotels.hotels);
  const isLoading = useSelector((state) => state.ui.isLoading);
  const [count, setCount] = useState(0);

  const currentHotels = hotels.slice(3 * count, 3 * count + 3);

  const handleNext = () => {
    setCount(count + 1);
  };

  const handlePrev = () => {
    if (count <= 0) {
      setCount(0);
    } else {
      setCount(count - 1);
    }
  };

  const handleDelete = async (id) => {
    dispatch(startLoading());
    await dispatch(deleteHotel(id));
    dispatch(fetchHotels()).then(() => {
      dispatch(stopLoading());
    });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen max-h-screen overflow-y-auto">
      <h1 className="text-4xl font-bold m-16">Hotel list here</h1>
      <button type="button" onClick={handlePrev}>
        Prev
      </button>
      {isLoading && (<Spinner parentClasses='grow flex justify-center' classes='bg-gray-400'/>)}
      {!isLoading && currentHotels.length > 0 && (
      <ul className="hotels flex flex-wrap gap-8">
        {currentHotels
          && currentHotels.map((hotel) => (
            <li
              key={hotel.id}
              className="hotel max-w-[300px] min-w-[80px] hover:scale-110 box-content p-2 hover:bg-[#9867f5] hover:text-white rounded-xl"
            >
              <div className="imageContainer w-[300px] h-[170px]">
                <img
                  className="w-full h-full rounded-lg"
                  src={`${API_URL}${hotel.image.url}`}
                  alt={hotel.name}
                />
              </div>
              <div className="text-gray-400 hover:text-white">
                <h2 className="hotelName my-3 text-black text-lg font-black text-center">{hotel.name.toUpperCase()}</h2>
                <div className="text-center mb-3 text-gray-400">-----------------------</div>
              </div>
              <button type="button" onClick={() => handleDelete(hotel.id)} className="p-4 bg-red-600">Delete</button>
            </li>
          ))}
      </ul> )}
      <button type="button" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default RemoveHotel;
