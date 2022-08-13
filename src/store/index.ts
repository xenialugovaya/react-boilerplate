import { routerMiddleware } from 'connected-react-router';
import { configureStore as confStore, EnhancedStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { config } from '@common/config';

import rootReducer, { history } from './root-reducer';
import { rootSaga } from './root-saga';

const configureStore = (preloadedState: unknown = {}): EnhancedStore => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware, routerMiddleware(history)];

  const store = confStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
    middleware,
  });

  // Включаем redux-saga middleware
  sagaMiddleware.run(rootSaga);

  if (config.environment !== 'production' && module.hot) {
    module.hot.accept('./root-reducer', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
};

const store = configureStore();

export { store };
export { history } from './root-reducer';
export { createMockState } from './mockState';
export type RootState = ReturnType<typeof rootReducer>;
