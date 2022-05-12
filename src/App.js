import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchToken } from './redux/Auth/auth';
import { fetchHotels, putHotels } from './redux/Hotel/hotel';

import './App.css';
import Header from './components/Header/Header';
import AddHotel from './components/AddHotel/AddHotel';
import { fetchRooms } from './redux/Room/room';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchToken());
    dispatch(fetchHotels());
    dispatch(putHotels({
      name: 'Four Seasons',
      location: 'Spain',
      description: 'This is the best Four Seasons hotel in the world',
      rating: 5,
      image: 'https://pix10.agoda.net/hotelImages/5547513/-1/555ac3a73a392de501fd0a0b50d8fdff.jpg?ca=7&ce=1&s=1024x768',
      rooms: [
        {
          id: 1,
          price: 500,
          image: 'Image',
        },
      ],
    }));
    dispatch(fetchRooms());
  }, [dispatch, fetchToken]);

  return (
    <>
      <Header />
      <AddHotel />
    </>
  );
};

export default App;
