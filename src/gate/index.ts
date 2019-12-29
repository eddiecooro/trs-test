import api from './api';

const methods = {
  delete: (url: string, data = {}) => api.delete(url, data),
  get: (url: string, data = {}) => api.get(url, data),
  patch: (url: string, data = {}) => api.patch(url, data),
  post: (url: string, data = {}) => api.post(url, data),
  put: (url: string, data = {}) => api.put(url, data),
};

const requests = {
  getCategories: () => methods.get('/categories'),
  getCategoryPosts: (category: string) =>
    methods.get(`/categories/${category}`),
};

export default {
  ...methods,
  ...requests,
};
