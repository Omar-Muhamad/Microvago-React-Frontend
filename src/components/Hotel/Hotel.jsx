import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHotels } from '../../redux/Hotel/hotel';

const Hotel = () => {
  const dispatch = useDispatch();
  const hotels = useSelector((state) => state.hotels.hotels);
  useEffect(() => {
    dispatch(fetchHotels());
  }, []);
  return (
    <>
      <h1>Hotel list here</h1>
      <ul className="hotels">
        {hotels.map((hotel) => (
          <li key={hotel.id} className="hotel">
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
      </ul>
    </>
  );
};

export default Hotel;
