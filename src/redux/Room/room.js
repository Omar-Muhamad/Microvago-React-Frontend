/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as apiHelper from '../api/apiHelper';

const initialState = {
  rooms: [],
};

export const fetchRooms = createAsyncThunk(
  'rooms',
  async () => {
    console.log('asd');
    const response = await apiHelper.getRooms();
    return response.data;
  },
);

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRooms.fulfilled, (state, action) => {
      state.rooms = action.payload;
    });
  },
});

export default roomSlice.reducer;
