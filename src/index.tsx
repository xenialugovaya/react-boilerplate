import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { AppRoutes } from '@src/routes';

import { config } from '@common/config';

// import { actions as initProcessActions } from '@processes/init';

import { store, history } from '@store';

// store.dispatch(initProcessActions.initApp());

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <AppRoutes history={history} />
    </Provider>,
    document.getElementById('app'),
  );
};

window.addEventListener('load', render);

if (config.environment !== 'production' && module.hot) {
  module.hot.accept('@src/routes', render);
}
