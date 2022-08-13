import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { History, LocationState } from 'history';

import { MainPage } from '@pages';
import { MainLayout, AppErrorBoundary } from '@layouts';

import { URLS } from '@common/constants';

import { RouteWrapper } from './RouteWrapper';

interface AppRoutesProps<S = LocationState> {
  history: History<S>;
}

/**
 * @param props - пропсы компонента
 * @returns Компонент с роутами приложения
 */
export function AppRoutes<S = LocationState>({
  history,
}: AppRoutesProps<S>): JSX.Element {
  return (
    <AppErrorBoundary>
      <ConnectedRouter history={history}>
        <Switch>
          <RouteWrapper
            exact
            path={URLS.MAIN}
            component={MainPage}
            layout={MainLayout}
          />
          <Route path="*" render={() => <Redirect to={URLS.MAIN} />} />
        </Switch>
      </ConnectedRouter>
    </AppErrorBoundary>
  );
}
