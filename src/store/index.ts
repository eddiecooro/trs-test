import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';

import rootSaga from 'store/sagas/index';
import rootReducer from 'store/reducers';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'trspersist',
  storage: AsyncStorage,
  whitelist: ['posts'],
};

const persistedReducers = persistReducer(persistConfig, rootReducer);

const defaultMiddlewareConfig = {
  serializableCheck: {
    ignoredActions: ['persist/PERSIST'],
  },
};

const middleware = [
  sagaMiddleware,
  ...getDefaultMiddleware(defaultMiddlewareConfig),
  logger,
];

const store = configureStore({
  reducer: persistedReducers,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export { store, persistor };
