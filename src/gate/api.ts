import axios, { Method, AxiosRequestConfig } from 'axios';
import isEmpty from 'lodash/isEmpty';

import tokenHelper from 'helpers/token';
import env from 'react-native-dotenv';

const API_URL = env.API_URL;

const client = axios.create({ baseURL: API_URL });

const call = async (method: Method, url: string, data = {}) => {
  const token = await tokenHelper.get();

  const headers: any = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (token !== '') {
    headers.Authorization = `Bearer ${token}`;
  }

  const request: AxiosRequestConfig = { headers, method, url };

  if (!isEmpty(data)) {
    request.data = data;
  }

  try {
    const response = await client(request);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response);
  }
};

const auth = {
  async signOut(url: string) {
    tokenHelper.clear();
    call('post', url);
  },
};

export default {
  ...auth,
  delete: (url: string, data = {}) => call('delete', url, data),
  get: (url: string, data = {}) => call('get', url, data),
  patch: (url: string, data = {}) => call('patch', url, data),
  post: (url: string, data = {}) => call('post', url, data),
  put: (url: string, data = {}) => call('put', url, data),
};
