import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as apiHelper from '../api/apiHelper';

const initialState = {
  token: null,
};

export const fetchToken = createAsyncThunk(
  'auth/login',
  async () => {
    const response = await apiHelper.login();
    return response.data;
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchToken.fulfilled, (state, action) => {
      state.token = action.payload.token;
    });
  },
});

export const { } = authSlice.actions;

export default authSlice.reducer;
