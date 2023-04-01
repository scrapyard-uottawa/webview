import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, authed, level, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authed && level >= rest.level ? (
        <Component {...props} />
      ) : (
        <Navigate
          to={{
            pathname: '/SignIn',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default PrivateRoute;