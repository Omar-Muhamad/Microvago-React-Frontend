import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from './Auth/auth';
import hotelsReducer from './Hotel/hotel'

const store = configureStore({
  reducer: { auth: authReducer, hotels: hotelsReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
