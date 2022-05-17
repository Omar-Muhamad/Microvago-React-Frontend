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
    // console.log('RESPONSE FROM RESERVATION:', response.data);
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

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReservation.fulfilled, (state, action) => {
      state.reservation = action.payload;
    });
  },
});

export default reservationSlice.reducer;
