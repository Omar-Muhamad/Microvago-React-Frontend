import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './redux/Auth/auth';
import './App.css';
import Header from './components/Header/Header';
import Hotel from './components/Hotels/Hotels';
import Splash from './components/Splash/Splash';

import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import history from './utils/history';

const App = () => {
  // const router = useHistory();
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  return (
    <div className="grid grid-cols-5">
      {isAuthorized && <Header />}
      <div className="col-span-4">
        <Routes history={history}>
          {isAuthorized && (
            <>
              <Route path="/" element={<Hotel />} />
              {/* <Route path="/splash" element={<Splash />} /> */}
              {/* <Route path="/addReservation" element={<AddReservation />} />
          <Route path="/reservaions" element={<MyReservations />} />
          <Route path="/addHotel" element={<AddHotel />} />
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
      </div>
    </div>
  );
};

export default App;
