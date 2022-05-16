import axios from 'axios';

export const API_URL = 'https://microvago.herokuapp.com';

export const login = async (UserData) => axios({
  method: 'post',
  url: `${API_URL}/auth/login`,
  data: {
    email: UserData.email,
    password: UserData.password,
  },
});

export const signUp = async (UserData) => axios({
  method: 'post',
  url: `${API_URL}/users`,
  data: {
    name: UserData.name,
    admin: UserData.admin,
    profile_picture: UserData.profile_picture,
    email: UserData.email,
    password: UserData.password,
  },
});

export const getHotels = async () => axios({
  method: 'get',
  url: `${API_URL}/hotels`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const getHotelDetails = async (id) => axios({
  method: 'get',
  url: `${API_URL}/hotels/${id}`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const postHotels = async (hotel) => axios({
  method: 'post',
  url: `${API_URL}/hotels`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
  data: hotel,
});

export const getRooms = async () => axios({
  method: 'get',
  url: `${API_URL}/rooms`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});
