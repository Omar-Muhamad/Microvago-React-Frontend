import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchHotels } from '../../redux/Hotel/hotel';
import { API_URL } from '../../redux/api/apiHelper';

const Hotels = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHotels());
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
    <div className="flex flex-col justify-center items-center min-h-screen max-h-screen overflow-y-auto">
      <h1 className="text-4xl font-bold m-16">Hotel list here</h1>
      <button type="button" onClick={handlePrev}>
        Prev
      </button>
      <ul className="hotels flex flex-wrap gap-8">
        {currentHotels
          && currentHotels.map((hotel) => (
            <li
              key={hotel.id}
              className="hotel max-w-[300px] min-w-[80px] hover:scale-110 box-content p-2 hover:bg-[#9867f5] hover:text-white rounded-xl"
            >
              <NavLink to={`hotels/${hotel.id}`}>
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
                  <p>{`Location: ${hotel.location}`}</p>
                  <p>{`Rating: ${hotel.rating}`}</p>
                  <p>{`Description: ${hotel.description}`}</p>
                </div>
              </NavLink>
            </li>
          ))}
      </ul>
      <button type="button" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default Hotels;
