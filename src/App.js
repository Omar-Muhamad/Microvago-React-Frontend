import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchToken } from './redux/Auth/auth'
import { fetchHotels } from './redux/Hotel/hotel'

import './App.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchToken());
    dispatch(fetchHotels());
  }, [dispatch, fetchToken]);

  return (
    'Hi'
  );
}

export default App;
