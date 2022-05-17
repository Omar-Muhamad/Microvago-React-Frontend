import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from './Auth/auth';
import hotelsReducer from './Hotel/hotel';
import roomReducer from './Room/room';

const store = configureStore({
  reducer: {
    auth: authReducer, hotels: hotelsReducer, rooms: roomReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
