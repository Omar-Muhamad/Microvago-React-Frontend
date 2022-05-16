/* eslint-disable no-param-reassign */
// import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import history from '../../utils/history';
import * as apiHelper from '../api/apiHelper';

const initialState = {
  token: null,
  isAuthorized: false,
};

export const login = createAsyncThunk('auth/login', async (payload) => {
  try {
    const response = await apiHelper.login(payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

export const signUp = createAsyncThunk('signup', async (payload) => {
  try {
    const response = await apiHelper.signUp(payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkAuth: (state) => {
      const token = localStorage.getItem('token');
      if (token) {
        state.token = token;
        state.isAuthorized = true;
      }
    },
    logout: () => {
      localStorage.removeItem('token');
      return {
        ...initialState,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      localStorage.setItem('token', action.payload.token);
      state.token = action.payload.token;
      state.isAuthorized = true;
      history.push('/');
      history.go(0);
    });
    builder.addCase(signUp.fulfilled, (state) => ({
      ...state,
      isAuthorized: false,
      error: {},
    }));
  },
});

export const { checkAuth, logout } = authSlice.actions;

export default authSlice.reducer;
