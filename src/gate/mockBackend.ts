import MockAdapter from 'axios-mock-adapter';
import { AxiosInstance } from 'axios';
import data from '../data.json';
import { unique } from '../helpers/util';

let mock: MockAdapter;

const mockApis = () => {
  if (!mock) throw new Error("Mock doesn't exist");

  mock.onGet('/categories').reply(200, {
    categories: unique(
      data.map(d => ({
        categoryDisplayName: d.categoryDisplayName,
        categoryIdentifier: d.categoryIdentifier,
      })),
      d => d.categoryIdentifier,
    ),
  });

  mock.onGet(/\/categories\/\S*/).reply(config => {
    const urlParts = config.url && config.url.split('/');
    if (urlParts) {
      const category =
        urlParts[urlParts.length - 1] || urlParts[urlParts.length - 2];
      if (category) {
        return [
          200,
          {
            posts: data
              .filter(d => d.categoryIdentifier === category)
              .map(d => ({ ...d, category: d.categoryIdentifier })),
          },
        ];
      }
    }
    return [401, { error: 'invalid category' }];
  });
};

export default (axiosInstance: AxiosInstance) => {
  mock = new MockAdapter(axiosInstance, { delayResponse: 2500 });
  mockApis();
};
