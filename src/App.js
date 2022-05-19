import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './redux/Auth/auth';
import { fetchRooms } from './redux/Room/room';

import Splash from './components/Splash/Splash';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Header from './components/Header/HeaderContainer';
import AddHotel from './components/Hotels/AddHotel';
import Hotels from './components/Hotels/Hotels';
import HotelDetails from './components/Hotels/HotelDetails';
import AddReservation from './components/Reservations/AddReservation';
import MyReservations from './components/Reservations/MyReservations';
import DeleteHotel from './components/Hotels/DeleteHotel';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);

  useEffect(() => {
    if (isAuthorized) {
      dispatch(fetchRooms());
    }
    dispatch(checkAuth());
  }, [isAuthorized]);

  return (
    <>
      {isAuthorized && (
        <div className="grid sm:grid-cols-5 w-full overflow-none">
          {isAuthorized && <Header />}
          <div className="sm:col-span-4 col-span-full w-full h-hero sm:h-full sm:w-auto mt-16 sm:mt-0">
            <Routes>
              <Route path="/" element={<Hotels />} />
              <Route path="/hotels/add" element={<AddHotel />} />
              <Route path="/hotels/:id" element={<HotelDetails />} />
              <Route path="/reservations/add" element={<AddReservation />} />
              <Route path="/myreservations" element={<MyReservations />} />
              <Route path="/hotels/delete" element={<DeleteHotel />} />
            </Routes>
          </div>
        </div>
      )}
      {!isAuthorized && (
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Splash />} />
        </Routes>
      )}
    </>
  );
};

export default App;
