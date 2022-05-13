import axios from 'axios';

const API_URL = 'https://microvago.herokuapp.com';

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
