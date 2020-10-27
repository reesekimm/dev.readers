import { Store } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware, { Task } from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';
import { logger } from 'redux-logger';

import createReducer from 'features';
import rootSaga from 'sagas';

export interface SagaStore extends Store {
  sagaTask: Task;
}

export const configureAppStore = (initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware();
  const { run: runSaga } = sagaMiddleware;
  const middlewares = [...getDefaultMiddleware(), sagaMiddleware];

  const store = configureStore({
    reducer: createReducer(),
    middleware: process.env.NODE_ENV === 'production' ? [...middlewares] : [...middlewares, logger],
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== 'production',
  });

  (store as SagaStore).sagaTask = runSaga(rootSaga);

  return store;
};

export const wrapper = createWrapper(configureAppStore, {
  debug: false,
});
