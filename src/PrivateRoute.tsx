import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/auth';

const PrivateRoute = (props: RouteProps) => {
  const auth = firebase.auth();

  return (
    <Route
      path={props.path}
      render={({ location }) =>
        auth.currentUser ? (
          props.component
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
