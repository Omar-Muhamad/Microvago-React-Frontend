import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchToken } from './redux/Auth/auth';
import { fetchHotels } from './redux/Hotel/hotel';

import './App.css';
import Header from './components/Header/Header';
import Hotel from './components/Hotel/Hotel';
import Splash from './components/Splash/Splash';

const App = () => {
  const dispatch = useDispatch();
  const { isAuthorized } = useSelector((state) => state.auth.isAuthorized);

  useEffect(() => {
    dispatch(fetchToken());
    dispatch(fetchHotels());
  }, [dispatch, fetchToken]);

  if (!isAuthorized) {
    return (
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Hotel />} />
          <Route path="/splash" element={<Splash />} />
        </Routes>
      </>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
    </Routes>
  );
};

export default App;
