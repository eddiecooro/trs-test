import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { configureStore, getDefaultMiddleware, Action } from '@reduxjs/toolkit';

import rootReducer from 'store/reducers';
import { ThunkAction } from 'redux-thunk';

const persistConfig = {
  key: 'trspersist',
  storage: AsyncStorage,
  whitelist: ['posts', 'categories'],
};

const persistedReducers = persistReducer(persistConfig, rootReducer);

const defaultMiddlewareConfig = {
  serializableCheck: {
    ignoredActions: ['persist/PERSIST'],
  },
};

const middleware = [...getDefaultMiddleware(defaultMiddlewareConfig), logger];

const store = configureStore({
  reducer: persistedReducers,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export { store, persistor };
