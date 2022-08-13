import { Route, RouteProps } from 'react-router';
import React from 'react';

export interface RouteWrapperProps extends RouteProps {
  layout?: RouteProps['component'];
}

/**
 * Обертка над компонентом Route
 * @returns react-элемент
 */
export const RouteWrapper: React.FC<RouteWrapperProps> = ({
  component: Component,
  layout: Layout,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      Layout ? (
        <Layout {...props}>
          <Component {...props} />
        </Layout>
      ) : (
        <Component {...props} />
      )
    }
  />
);
