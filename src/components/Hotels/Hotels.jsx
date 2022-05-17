import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchHotels } from '../../redux/Hotel/hotel';

const Hotel = () => {
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
    <div className="min-h-screen max-h-screen w-full overflow-y-auto text-center grid grid-rows-4 text-[#6D22FB]">
      <div className="titleContainer flex flex-col items-center justify-end gap-3 text-gray-400">
        <h1 className="text-6xl font-bold text-gray-700">Hotels List</h1>
        <p className="text-lg">Click to view hotel details</p>
        <p>------------------</p>
      </div>
      <div className="hotelsContainer row-span-3 w-full flex items-center">
        <button className="px-4 pl-7 py-3 rounded-r-full h-fit bg-[#6D22FB]" type="button" onClick={handlePrev}>
          <i className="fa-solid fa-angle-left fa-lg text-white" />
        </button>
        <ul className="hotels grow px-4 flex flex-wrap justify-center gap-6">
          {currentHotels
            && currentHotels.map((hotel) => (
              <li
                key={hotel.id}
                className="hotel"
              >
                <NavLink to={`hotels/${hotel.id}`}>
                  <div className="imageContainer w-[300px] h-[220px]">
                    <img
                      className="w-full h-full rounded-lg bg-[#6D22FB] rounded-tl-[35%] rounded-br-[35%]"
                      src={`https://microvago.herokuapp.com${hotel.image.url}`}
                      alt={hotel.name}
                    />
                  </div>
                  <div className="text-gray-400">
                    <h2 className="hotelName my-2 mt-8 text-black text-lg font-black text-center">{hotel.name.toUpperCase()}</h2>
                    <div className="text-center mb-3 text-4x font-bold text-gray-400">------------------</div>
                    <p>{`Location: ${hotel.location}`}</p>
                    <p>{`Rating: ${hotel.rating}`}</p>
                  </div>
                </NavLink>
              </li>
            ))}
        </ul>
        <button className="px-4 pr-7 py-3 rounded-l-full h-fit bg-[#6D22FB]" type="button" onClick={handleNext}>
          <i className="fa-solid fa-angle-right fa-lg text-white" />
        </button>
      </div>
    </div>
  );
};

export default Hotel;
