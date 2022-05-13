import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchToken } from './redux/Auth/auth';
import { fetchHotels } from './redux/Hotel/hotel';

import './App.css';
// import Header from './components/Header/Header';
// import Hotel from './components/Hotel/Hotel';
import Splash from './components/Splash/Splash';

const App = () => {
  const dispatch = useDispatch();
  // const { isAuthorized } = useSelector((state) => state.auth.isAuthorized);

  useEffect(() => {
    dispatch(fetchToken());
    dispatch(fetchHotels());
  }, [dispatch, fetchToken]);

  // if (!isAuthorized) {
  //   return (
  //     <>
  //       <Header />
  //       <Routes>
  //         <Route path="/" element={<Hotel />} />
  //         <Route path="/splash" element={<Splash />} />
  //         {/* <Route path="/addReservation" element={<AddReservation />} />
  //         <Route path="/reservaions" element={<MyReservations />} />
  //         <Route path="/addHotel" element={<AddHotel />} />
  //         <Route path="/delHotel" element={<DelHotel />} /> */}
  //       </Routes>
  //     </>
  //   );
  // }
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      {/* <Route path="/login" element={<Login />} /> */}
      {/* <Route path="/signup" element={<SignUp />} /> */}
    </Routes>
  );
};

export default App;
