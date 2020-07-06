import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { Store } from "../store";

const PrivateRoute = ({ component: Component, ...rest }) => {
  // Add your own authentication on the below line.
  const { state } = useContext(Store);
  const isLoggedIn = state.user;
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
