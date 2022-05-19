import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchHotels } from '../../redux/Hotel/hotel';
import { API_URL } from '../../redux/api/apiHelper';
import { startLoading, stopLoading } from '../../redux/UI/ui';

import Spinner from '../Spinner/Spinner';

const Hotels = () => {
  const isLoading = useSelector((state) => state.ui.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoading());
    dispatch(fetchHotels()).then(() => {
      dispatch(stopLoading());
    });
  }, []);

  const hotels = useSelector((state) => state.hotels.hotels);
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

  return (
    <div className="h-hero sm:min-h-screen h-full w-full overflow-y-auto text-center flex flex-col text-[#6D22FB]">
      <div className="titleContainer flex flex-col items-center mt-16 sm:mt-40 justify-end gap-3 text-gray-400">
        <h1 className="text-4xl sm:text-6xl font-bold text-gray-700">Hotels List</h1>
        <p className="text-lg">Click to view hotel details</p>
        <p>------------------</p>
      </div>
      <div className="hotelsContainer py-10 sm:mt-10 row-span-3 w-full flex items-center">
        <button
          className="px-4 pl-7 py-3 rounded-r-full h-fit bg-[#6D22FB]"
          type="button"
          onClick={handlePrev}
        >
          <i className="fa-solid fa-angle-left fa-lg text-white" />
        </button>
        {isLoading && (<Spinner parentClasses='grow flex justify-center' classes='bg-gray-400'/>)}
        {!isLoading && hotels.length > 0 
          && (<ul className="hotels grow px-4 sm:px-14 2xl:px-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-14 2xl:gap-20">
            {currentHotels && currentHotels.map((hotel) => (
              <li key={hotel.id} className="hotel">
                <NavLink to={`hotels/${hotel.id}`}>
                  <div className="imageContainer w-full h-[220px]">
                    <img
                      className="w-full h-full rounded-lg bg-[#6D22FB] rounded-tl-[35%] rounded-br-[35%]"
                      src={`${API_URL}${hotel.image.url}`}
                      alt={hotel.name}
                    />
                  </div>
                  <div className="text-gray-400">
                    <h2 className="hotelName my-2 mt-8 text-black text-lg font-black text-center">
                      {hotel.name.toUpperCase()}
                    </h2>
                    <div className="text-center mb-3 text-4x font-bold text-gray-400">
                      ------------------
                    </div>
                    <p>{`Location: ${hotel.location}`}</p>
                    <p>{`Rating: ${hotel.rating}`}</p>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        )}
        {!isLoading && hotels.length === 0 && (
          <div className="text-2xl text-gray-400 grow text-center font-bold select-none">No hotels to display</div>
        )}
        <button
          className="px-4 pr-7 py-3 rounded-l-full h-fit bg-[#6D22FB]"
          type="button"
          onClick={handleNext}
        >
          <i className="fa-solid fa-angle-right fa-lg text-white" />
        </button>
      </div>
    </div>
  );
};

export default Hotels;
