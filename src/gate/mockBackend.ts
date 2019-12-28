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
    console.log(config.url);
    return [200, {}];
  });
};

export default (axiosInstance: AxiosInstance) => {
  mock = new MockAdapter(axiosInstance, { delayResponse: 2500 });
  mockApis();
};
