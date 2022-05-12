import axios from 'axios';

const API_URL = 'https://microvago.herokuapp.com';

export const login = async () => axios({
  method: 'post',
  url: `${API_URL}/auth/login`,
  data: {
    email: 'admin@gmail.com',
    password: 'admin',
  },
});

export const getHotels = async () => axios({
  method: 'get',
  url: `${API_URL}/hotels`,
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
  url: `${API_URL}/rooms/index`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});
