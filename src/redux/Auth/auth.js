/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as apiHelper from '../api/apiHelper';

const initialState = {
  token: null,
  isAuthorized: false,
  admin: false,
  error: '',
};

export const login = createAsyncThunk('auth/login', async (payload) => {
  try {
    const response = await apiHelper.login(payload);
    if (response.data.error) {
      return response.data.error;
    }
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
      const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
      if (token) {
        state.token = token;
        state.isAuthorized = true;
        state.admin = isAdmin;
        state.error = '';
      }
    },
    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('isAdmin');
      return {
        ...initialState,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.error = action.payload.error;
      } else {
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('isAdmin', JSON.stringify(action.payload.admin));
        state.token = action.payload.token;
        state.admin = action.payload.admin;
        state.isAuthorized = true;
        state.error = '';
      }
    });
    builder.addCase(signUp.fulfilled, (state) => ({
      ...state,
      isAuthorized: false,
    }));
  },
});

export const { checkAuth, logout } = authSlice.actions;

export default authSlice.reducer;
