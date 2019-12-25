import { combineReducers } from 'redux';

import appReducer from './app';
import postsReducer from './posts';

const rootReducers = combineReducers({
  posts: postsReducer,
  app: appReducer,
});

export default rootReducers;
