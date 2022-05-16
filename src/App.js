import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './redux/Auth/auth';
import './App.css';
import Header from './components/Header/Header';
import AddHotel from './components/AddHotel/AddHotel';
import { fetchRooms } from './redux/Room/room';
import { fetchHotels } from './redux/Hotel/hotel';
import Hotel from './components/Hotel/Hotel';
import Splash from './components/Splash/Splash';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import history from './utils/history';

const App = () => {
  // const router = useHistory();
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);

  useEffect(() => {
    dispatch(fetchHotels());
    dispatch(fetchRooms());
    dispatch(checkAuth());
  }, [dispatch, checkAuth]);

  return (
    <>
      {isAuthorized && <Header />}
      <Routes history={history}>
        {isAuthorized && (
          <>
            <Route path="/" element={<Hotel />} />
            <Route path="/addHotel" element={<AddHotel />} />
            {/* <Route path="/splash" element={<Splash />} /> */}
            {/* <Route path="/addReservation" element={<AddReservation />} />
        <Route path="/reservaions" element={<MyReservations />} />
        <Route path="/delHotel" element={<DelHotel />} /> */}
          </>
        )}
        {!isAuthorized && (
          <>
            <Route path="/" element={<Splash />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Splash />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
