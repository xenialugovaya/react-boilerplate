import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import { config } from '@common/config';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  [config.modules.router]: connectRouter(history),
});

export default rootReducer;
