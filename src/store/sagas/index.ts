import { all, fork } from 'redux-saga/effects';

import post from './post';

export default function* root() {
  yield all([fork(post)]);
}
