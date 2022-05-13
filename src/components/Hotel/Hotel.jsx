import { useSelector } from 'react-redux';

const Hotel = () => {
  const hotels = useSelector((state) => state.hotels.hotels);

  // const handleClick = () => { localStorage.clear(); };

  return (
    <>
      {/* <button type="button" onClick={handleClick}>Logout</button> */}
      <h1>Hotel list here</h1>
      <ul className="hotels">
        {hotels.map((hotel) => (
          <li key={hotel.id} className="hotel">
            <div className="imageContainer w-[300px] h-[170px]">
              <img className="w-full h-full" src={hotel.image} alt={hotel.name} />
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
