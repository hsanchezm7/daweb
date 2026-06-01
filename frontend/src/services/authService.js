import { apiAuth } from './api';

const authService = {
  login: (email, password) =>
    apiAuth
      .post('/auth/login', { username: email, password })
      .then((r) => r.data),

  register: (data) => apiAuth.post('/usuarios', data).then((r) => r.data),

  refresh: () => apiAuth.post('/auth/refresh').then((r) => r.data),

  logout: () => apiAuth.post('/auth/logout').then((r) => r.data),
};

export default authService;
