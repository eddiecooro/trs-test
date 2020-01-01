import axios, { Method, AxiosRequestConfig } from 'axios';
import isEmpty from 'lodash/isEmpty';
import mock from './mockBackend';

import tokenHelper from 'helpers/token';
import { API_URL, MOCK_API } from 'react-native-dotenv';

const client = axios.create({ baseURL: API_URL });
if (MOCK_API) {
  mock(client);
}

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

  const response = await client(request);

  return response.data;
};

export default {
  delete: (url: string, data = {}) => call('delete', url, data),
  get: (url: string, data = {}) => call('get', url, data),
  patch: (url: string, data = {}) => call('patch', url, data),
  post: (url: string, data = {}) => call('post', url, data),
  put: (url: string, data = {}) => call('put', url, data),
};
