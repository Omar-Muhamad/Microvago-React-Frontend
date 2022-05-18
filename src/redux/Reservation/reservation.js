/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as apiHelper from '../api/apiHelper';

const initialState = {
  reservation: [],
};

export const fetchReservation = createAsyncThunk(
  'reservation',
  async () => {
    const response = await apiHelper.getReservation();
    return response.data;
  },
);

export const putReservation = createAsyncThunk(
  'putReservation',
  async (reservationObj) => {
    const response = await apiHelper.putReservation(reservationObj);
    return response.data;
  },
);

export const deleteReservation = createAsyncThunk(
  'delete/reservation',
  async (id) => {
    await apiHelper.removeReservation(id);
    return id;
  },
);

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReservation.fulfilled, (state, action) => {
      state.reservation = action.payload;
    });
    builder.addCase(putReservation.fulfilled, (state, action) => {
      state.reservation = [...state.reservation, action.payload];
    });
    builder.addCase(deleteReservation.fulfilled, (state, action) => {
      state.reservation = state.reservation.filter((reserve) => reserve.id !== action.payload);
    });
  },
});

export default reservationSlice.reducer;
