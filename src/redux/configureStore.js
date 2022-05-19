import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from './Auth/auth';
import hotelsReducer from './Hotel/hotel';
import roomReducer from './Room/room';
import reservationReducer from './Reservation/reservation';
import uiReducer from './UI/ui'

const store = configureStore({
  reducer: {
    auth: authReducer,
    hotels: hotelsReducer,
    rooms: roomReducer,
    reservations: reservationReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
