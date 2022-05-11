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
