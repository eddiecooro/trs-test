import api from './api';

const methods = {
  delete: (url: string, data = {}) => api.delete(url, data),
  get: (url: string, data = {}) => api.get(url, data),
  patch: (url: string, data = {}) => api.patch(url, data),
  post: (url: string, data = {}) => api.post(url, data),
  put: (url: string, data = {}) => api.put(url, data),
};

const auth = {
  checkMe: () => api.get('check/me'),
  checkUser: () => api.get('check/user'),
  checkVer: () => api.get('check/ver'),

  signIn: (data: any) => api.post('sign-in', data),
  signInConfirmation: (data: any) => api.post('sign-in-confirmation', data),

  signOut: () => api.signOut('sign-out'),

  signUp: (data: any) => api.post('sign-up', data),
  signUpConfirmation: (data: any) => api.post('sign-up-confirmation', data),
};

export default {
  ...methods,
  ...auth,
};
