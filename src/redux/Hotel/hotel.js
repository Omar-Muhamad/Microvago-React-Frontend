/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as apiHelper from '../api/apiHelper';

const initialState = {
  hotels: [],
  hotelDetails: {},
};

export const fetchHotels = createAsyncThunk(
  'hotels',
  async () => {
    const response = await apiHelper.getHotels();
    return response.data;
  },
);

export const fetchHotelsDetails = createAsyncThunk(
  'hotels/details',
  async (id) => {
    const response = await apiHelper.getHotelDetails(id);
    return response.data;
  },
);

export const putHotels = createAsyncThunk(
  'put_hotels',
  async (hotels) => {
    const response = await apiHelper.postHotels(hotels);
    return response.data;
  },
);

const hotelSlice = createSlice({
  name: 'hotel',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHotels.fulfilled, (state, action) => {
      state.hotels = action.payload;
    });
    builder.addCase(fetchHotelsDetails.fulfilled, (state, action) => {
      state.hotelDetails = action.payload;
    });
  },
});

// export const {  } = hotelSlice.actions;

export default hotelSlice.reducer;
