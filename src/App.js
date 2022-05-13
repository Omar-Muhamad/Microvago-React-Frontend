import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchToken } from './redux/Auth/auth';
import { fetchHotels } from './redux/Hotel/hotel';

import './App.css';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
// import SignUp from './components/SignUp/SignUp';

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
      {/* <SignUp /> */}
      {/* <Login />
      <SignUp /> */}
    </>
  );
};

export default App;
