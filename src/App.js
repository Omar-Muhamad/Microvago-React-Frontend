import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchToken } from './redux/Auth/auth';
import { fetchHotels } from './redux/Hotel/hotel';
import './App.css';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';

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
          <Route path="/" element={<Login />} />
          <Route path="/sign_up" element={<SignUp />} />
        </Routes>
      </>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<h1>SPLASH</h1>} />
    </Routes>
  );
};

export default App;
