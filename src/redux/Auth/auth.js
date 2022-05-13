import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as apiHelper from '../api/apiHelper';

const initialState = {
  isAuthorized: false,
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
      localStorage.setItem('token', action.payload.token);
      state.isAuthorized = true; // eslint-disable-line 
    });
  },
});

// export const { } = authSlice.actions;

export default authSlice.reducer;
