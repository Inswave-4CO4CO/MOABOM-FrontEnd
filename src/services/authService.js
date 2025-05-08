import api from './api';

export const loginUser = (email, password) => {
  return api.post('/login', { email, password });
};
