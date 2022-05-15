import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
    <>
      {/* <button type="button" onClick={handleClick}>Logout</button> */}
      <ul className="hotels flex">
        <button type="button" onClick={handlePrev}>
          Prev
        </button>
        <h1>Hotel list here</h1>
        {currentHotels && currentHotels.map((hotel) => (
          <li key={hotel.id} className="hotel w-4/12">
            <div className="imageContainer w-[300px] h-[170px]">
              <img
                className="w-full h-full"
                src={hotel.image}
                alt={hotel.name}
              />
            </div>
            <h2 className="hotelName">{hotel.name}</h2>
            <p>{`Location: ${hotel.location}`}</p>
            <p>{`Rating: ${hotel.rating}`}</p>
            <p>{`Description: ${hotel.description}`}</p>
          </li>
        ))}
        <button type="button" onClick={handleNext}>
          Next
        </button>
      </ul>
    </>
  );
};

export default Hotel;
