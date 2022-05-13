// import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as apiHelper from '../api/apiHelper';

const initialState = {
  token: null,
};

export const fetchToken = createAsyncThunk(
  'auth/login',
  async (payload) => {
    const response = await apiHelper.login(payload);
    return response.data;
  },
);

export const signUp = createAsyncThunk(
  'signup',
  async (payload) => {
    const response = await apiHelper.signUp(payload);
    return response.data;
  },
);

// const authenticateBodyOptions = (formElem) => {
//   const data = new FormData(formElem);
//   const keys = [...data.keys()];
//   const values = [...data.values()];

//   const body = {
//     user: {
//     },
//   };

//   keys.forEach((key, index) => {
//     body.user[key] = values[index];
//   });

//   return body;
// };

// const authenticateBodyConfig = () => ({
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export const authenticateUser = createAsyncThunk(
//   'users/authenticate',
//   async (payload, { rejectWithValue }) => {
//     const data = authenticateBodyOptions(payload.form);
//     const config = authenticateBodyConfig();
//     try {
//       const response = await axios.post(data, config);
//       localStorage.setItem('signup', JSON.stringify(response.data));
//       return response.data;
//     } catch (err) {
//       return rejectWithValue({ ...err.response.data });
//     }
//   },
// );

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchToken.fulfilled, (state, action) => {
      localStorage.setItem('token', action.payload.token);
    });
  },
});

// export const { } = authSlice.actions;

export default authSlice.reducer;
