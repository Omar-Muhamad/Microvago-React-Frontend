// import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as apiHelper from '../api/apiHelper';

const initialState = {
  token: null,
  isAuthorized: false,
};

export const fetchToken = createAsyncThunk(
  'auth/login',
  async (payload) => {
    try {
      const response = await apiHelper.login(payload);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
);

export const signUp = createAsyncThunk(
  'signup',
  async (payload) => {
    try {
      const response = await apiHelper.signUp(payload);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /* redirect: (state) => {
      state.token = localStorage.getItem('token');
      dispatch
    } */
  },
  extraReducers: (builder) => {
    builder.addCase(fetchToken.fulfilled, (state, action) => {
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isAuthorized: true,
        error: {},
      };
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        isAuthorized: false,
        error: {},
      };
    });
  },
});

// export const { } = authSlice.actions;

export default authSlice.reducer;
