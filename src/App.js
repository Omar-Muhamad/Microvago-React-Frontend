import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchToken } from './redux/Auth/auth';
import { fetchHotels } from './redux/Hotel/hotel';

import './App.css';
import Header from './components/Header/Header';
import Login from './components/Login/Login';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchToken());
    dispatch(fetchHotels());
  }, [dispatch, fetchToken]);

  return (
    <>
      <Header />
      <Login />
    </>
  );
};

export default App;
