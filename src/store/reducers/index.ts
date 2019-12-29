import { combineReducers } from 'redux';

import postsReducer from './posts';
import categoriesReducer from './categories';

const rootReducers = combineReducers({
  posts: postsReducer,
  categories: categoriesReducer,
});

export default rootReducers;
