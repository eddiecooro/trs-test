import { combineReducers } from 'redux';

import appReducer from './app';
import postsReducer from './posts';
import categoriesReducer from './categories';

const rootReducers = combineReducers({
  posts: postsReducer,
  categories: categoriesReducer,
  app: appReducer,
});

export default rootReducers;
